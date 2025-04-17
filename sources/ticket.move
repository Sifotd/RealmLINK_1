/*
/// Module: rwa
module rwa::rwa;
*/

// For Move coding conventions, see
// https://docs.sui.io/concepts/sui-move-concepts/conventions


module  rwa::tickets{
    use std::string::{Self,String};
    use rwa::activity::Activiti;
    use sui::object::{uid_to_address};
 

     //票据结构体
    public struct Tickets has key,store{
        id:UID,
        info:String,
        state:u8,
        activity:address,
        admin:address,
        max_supply:u64,
        vip_supply:u64,//vip票

    }//有了这个之后就不需要集合来存储票

    public entry  fun create_tickets(
        info:String,
        state:u8,
        acti:&Activiti,//传入活动信息
        admin:address,
        max_supply:u64,
        vip_supply:u64,
        ctx:&mut TxContext

    ){
        //活动的创建者和票据的创建者是同一个人
        assert!(ctx.sender() == acti.admin,0);
        let acti_address = uid_to_address(&acti.id);
        let tickets = Tickets{
            id:object::new(ctx),
            info,
            state,
            activity:acti_address,
            admin,
            max_supply,
            vip_supply,
        };
        
    }
}