module rwa::people {
    use std::string::{String};
    use std::vector;
    use std::bool::{Self, bool};
    use sui::table::{Self, Table};
    use sui::tx_context::{Self, TxContext, sender};
    use sui::object::{Self, UID};
    use sui::transfer::{Self, public_share_object, transfer};
    use rwa::activity::{Activiti, create_tickets_verify, get_activity_id};
    use rwa::admin::F_Admin;

    // 错误常量
    const E_TOO_MANY: u64 = 1;
    const E_NO_NORMAL_TICKET: u64 = 2;
    const E_NO_VIP_TICKET: u64 = 3;
    const E_ACTIVITY_NOT_FOUND: u64 = 4;
    const E_TICKET_EXISTS: u64 = 5;

    // 票状态常量
    const TICKET_AVAILABLE: u8 = 0;
    const TICKET_SOLD: u8 = 1;
    const TICKET_USED: u8 = 2;

    // 票结构体
    public struct Ticket has key, store {
        id: UID,
        info: String,
        state: u8,
        activity: address,
        owner: address,
        is_vip: bool,
        price: u64,
    }

    // 票模板结构体（用于创建票）
    public struct TicketTemplate has key, store {
        id: UID,
        info: String,
        activity: address,
        admin: address,
        max_supply: u64,
        vip_supply: u64,
        price: u64,
        vip_price: u64,
    }

    // 票据列表结构体
    public struct TicketList has key, store {
        id: UID,
        normal_tickets: Table<address, Ticket>,
        vip_tickets: Table<address, Ticket>,
        ticket_count: u64,
        vip_ticket_count: u64,
    }

    // 参与者结构体
    public struct Participant has key, store {
        id: UID,
        name: String,
        info: String,
        wallet: address,
        events_attended: u64,
        tickets_owned: vector<address>,
        vip_tickets_owned: vector<address>,
    }

    // 活动参与者列表
    public struct Participants has key, store {
        id: UID,
        activity: address,
        attendees: vector<address>,
        checked_in: vector<address>,
    }

    // ========== 初始化函数 ==========

    // 创建票模板
    public entry fun create_ticket_template(
        info: String,
        activity: &Activiti,
        admin: &F_Admin,
        max_supply: u64,
        vip_supply: u64,
        price: u64,
        vip_price: u64,
        ctx: &mut TxContext
    ) {
        create_tickets_verify(activity, ctx);

        let template = TicketTemplate {
            id: object::new(ctx),
            info,
            activity: get_activity_id(activity),
            admin: admin.admin,
            max_supply,
            vip_supply,
            price,
            vip_price,
        };

        transfer(template, sender(ctx));
    }

    // 创建票列表
    public entry fun create_ticket_list(
        activity: &Activiti,
        ctx: &mut TxContext
    ) {
        create_tickets_verify(activity, ctx);

        let ticket_list = TicketList {
            id: object::new(ctx),
            normal_tickets: Table::new(ctx),
            vip_tickets: Table::new(ctx),
            ticket_count: 0,
            vip_ticket_count: 0,
        };

        public_share_object(ticket_list);
    }

    // 创建参与者
    public entry fun create_participant(
        name: String,
        info: String,
        ctx: &mut TxContext
    ) {
        let participant = Participant {
            id: object::new(ctx),
            name,
            info,
            wallet: sender(ctx),
            events_attended: 0,
            tickets_owned: vector::empty(),
            vip_tickets_owned: vector::empty(),
        };

        transfer(participant, sender(ctx));
    }

    // ========== 票务操作 ==========

    // 购买普通票
    public entry fun buy_normal_ticket(
        participant: &mut Participant,
        template: &mut TicketTemplate,
        ticket_list: &mut TicketList,
        ctx: &mut TxContext
    ) {
        assert!(template.max_supply > 0, E_NO_NORMAL_TICKET);

        let ticket = Ticket {
            id: object::new(ctx),
            info: template.info,
            state: TICKET_SOLD,
            activity: template.activity,
            owner: participant.wallet,
            is_vip: false,
            price: template.price,
        };

        let ticket_addr = object::id(&ticket);
        Table::add(&mut ticket_list.normal_tickets, ticket_addr, ticket);
        ticket_list.ticket_count = ticket_list.ticket_count + 1;
        vector::push_back(&mut participant.tickets_owned, ticket_addr);

        template.max_supply = template.max_supply - 1;
    }

    // 购买VIP票
    public entry fun buy_vip_ticket(
        participant: &mut Participant,
        template: &mut TicketTemplate,
        ticket_list: &mut TicketList,
        ctx: &mut TxContext
    ) {
        assert!(template.vip_supply > 0, E_NO_VIP_TICKET);

        let ticket = Ticket {
            id: object::new(ctx),
            info: template.info,
            state: TICKET_SOLD,
            activity: template.activity,
            owner: participant.wallet,
            is_vip: true,
            price: template.vip_price,
        };

        let ticket_addr = object::id(&ticket);
        Table::add(&mut ticket_list.vip_tickets, ticket_addr, ticket);
        ticket_list.vip_ticket_count = ticket_list.vip_ticket_count + 1;
        vector::push_back(&mut participant.vip_tickets_owned, ticket_addr);

        template.vip_supply = template.vip_supply - 1;
        template.max_supply = template.max_supply - 1;
    }

    // 转让票
    public entry fun transfer_ticket(
        sender: &mut Participant,
        receiver: &mut Participant,
        ticket_list: &mut TicketList,
        ticket_addr: address,
        is_vip: bool,
    ) {
        if (is_vip) {
            let ticket = Table::borrow_mut(&mut ticket_list.vip_tickets, ticket_addr);
            assert!(ticket.owner == sender.wallet, 0);
            ticket.owner = receiver.wallet;

            remove_address(&mut sender.vip_tickets_owned, ticket_addr);
            vector::push_back(&mut receiver.vip_tickets_owned, ticket_addr);
        } else {
            let ticket = Table::borrow_mut(&mut ticket_list.normal_tickets, ticket_addr);
            assert!(ticket.owner == sender.wallet, 0);
            ticket.owner = receiver.wallet;

            remove_address(&mut sender.tickets_owned, ticket_addr);
            vector::push_back(&mut receiver.tickets_owned, ticket_addr);
        }
    }

    // ========== 活动验证 ==========

    // 验证票并登记参与
    public entry fun verify_ticket_and_register(
        participant: &mut Participant,
        ticket_list: &mut TicketList,
        participants: &mut Participants,
        ticket_addr: address,
        is_vip: bool,
    ) {
        if (is_vip) {
            let ticket = Table::borrow_mut(&mut ticket_list.vip_tickets, ticket_addr);
            assert!(ticket.owner == participant.wallet, 0);
            assert!(ticket.state == TICKET_SOLD, 0);
            ticket.state = TICKET_USED;
        } else {
            let ticket = Table::borrow_mut(&mut ticket_list.normal_tickets, ticket_addr);
            assert!(ticket.owner == participant.wallet, 0);
            assert!(ticket.state == TICKET_SOLD, 0);
            ticket.state = TICKET_USED;
        }

        if (!vector::contains(&participants.attendees, &participant.wallet)) {
            vector::push_back(&mut participants.attendees, participant.wallet);
        };

        participant.events_attended = participant.events_attended + 1;
    }

    // ========== 查询函数 ==========

    public fun get_ticket_info(
        ticket_list: &TicketList,
        ticket_addr: address,
        is_vip: bool
    ): &Ticket {
        if (is_vip) {
            Table::borrow_mut(&ticket_list.vip_tickets, ticket_addr)
        } else {
            Table::borrow_mut(&ticket_list.normal_tickets, ticket_addr)
        }
    }

    public fun has_ticket(
        participant: &Participant,
        ticket_addr: address,
        is_vip: bool
    ): bool {
        if (is_vip) {
            vector::contains(&participant.vip_tickets_owned, &ticket_addr)
        } else {
            vector::contains(&participant.tickets_owned, &ticket_addr)
        }
    }

    // ========== 辅助函数 ==========

    fun remove_address(vec: &mut vector<address>, addr: address) {
        let len = vector::length(vec);
        let mut i = 0;
        while (i < len) {
            if (*vector::borrow(vec, i) == addr) {
                vector::remove(vec, i);
                break;
            };
            i = i + 1;
        }
    }
}
