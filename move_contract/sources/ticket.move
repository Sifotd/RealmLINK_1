// /*
// /// Module: rwa
// module rwa::rwa;
// */

// // For Move coding conventions, see
// // https://docs.sui.io/concepts/sui-move-concepts/conventions


// module  rwa::tickets{
//     use std::string::{Self, String};
//     use rwa::activity::{Activiti, create_tickets_verify, get_activity_id};
//     use sui::object::{uid_to_address};
//     use sui::table::{Table};
//     use sui::transfer::{public_share_object,public_transfer}; 

 

//      //票据结构体
//     public struct Tickets has key,store{
//         id:UID,
//         info:String,
//         state:u8,
//         activity:address,
//         admin:address,
//         max_supply:u64,
//         vip_supply:u64,//vip票

//     }//有了这个之后就不需要集合来存储票
    

    

//     //票据列表结构体
//     public struct TicketList has key,store{
//         id:UID,
//         tickets:Table<address, Tickets>,
//         vip_tickets:Table<address,Tickets>,
//     }
//     //票据列表的创建
//     //票据列表的所有者是活动的创建者
//     public entry fun create_ticket_list(
//         acti:&Activiti,//传入活动信息
//         ctx:&mut TxContext
//     ){
//         // 活动的创建者和票据的创建者是同一个人
//         create_tickets_verify(acti, ctx);
//         let acti_address = get_activity_id(acti);
//         let mut ticket_list = TicketList{
//             id:object::new(ctx),
//             tickets:Table<address, Tickets>::new(ctx),
//             vip_tickets:Table<address,Tickets>::new(ctx)
//         };  
      
//       //转移给活动创建者
//       public_share_object(ticket_list);

      
//     }
//     public entry  fun create_tickets(
//         info:String,
//         state:u8,
//         acti:&Activiti,//传入活动信息
//         admin:address,
//         max_supply:u64,
//         vip_supply:u64,
//         ctx:&mut TxContext

//     ){
//         // 活动的创建者和票据的创建者是同一个人
//         create_tickets_verify(acti, ctx);
//         let acti_address = get_activity_id(acti);
//         let mut tickets = Tickets{
//             id:object::new(ctx),
//             info,
//             state,
//             activity:acti_address,
//             admin,
//             max_supply,
//             vip_supply,
//         };
//         //买票？
//         //票是独享还是share?
       
//        //如何买票，->shre，所有人都可以看到这个结构体，并使用
//       public_share_object (tickets);
//     }

//     //获取票的信息
// //     public fun get_ticket_id(ticket:Tickets):address{
// //       uid_to_address(&ticket.id)
// // }
// //     public fun get_ticketlist_id(tickets:&TicketList):address{
// //       uid_to_address(&tickets.id)
// // }

    
// }