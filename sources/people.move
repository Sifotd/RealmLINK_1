module rwa ::people {
    // 活动参与者
    use std::string::{String};
    use std::vector::{empty, contains};
    use sui::tx_context::TxContext;
    use sui::object::{UID};
    use sui::transfer::{public_share_object}; 
    use rwa::activity::Activiti;
    use rwa::admin::F_Admin;
    use sui::object::uid_to_address;

    // 参与者结构体
    //参会者的vip等级由票决定
    //参会者的个人信息
public struct Participant has key,store{
    id:UID,
    name:String,
    info:String,
    wallet:address,
}
  //活动参与者列表
public struct Participants has key,store{
    id:UID,
    activity:Activiti,
    all:vector<address>,
  } 
  //先初始化个人信息
  //买票
  //核销
  public entry fun create_participant(name:String,info:String,ctx:&mut TxContext){
    let participant = Participant{
        id:object::new(ctx),
        name,
        info,
        wallet:ctx.sender(),
    };
    transfer::public_transfer(participant,ctx.sender());
  }

    //用户买票
}
