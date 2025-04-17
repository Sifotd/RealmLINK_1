module rwa::activity {

    use std::string::{String};
    use sui::tx_context::TxContext;
    use sui::object::{UID};
    use sui::transfer::{public_share_object};
    use rwa::admin::F_Admin;
    use sui::object::uid_to_address;

    const ErrNotActivityCreator: u64 = 1;

    // 活动结构体
    public struct Activiti has key, store {
        id: UID,
        info: String,
        start_time:u64,
        end_time:u64,
        max_people:u64,
        fare:u64,
        admin: address,
    }

    // 活动列表结构体
    public struct Activities has key, store {
        id: UID,
        all: vector<address>,
    }

    // 初始化活动列表
    public entry fun init_activities(ctx: &mut TxContext) {
        let activities = Activities {
            id: object::new(ctx),
            all: vector::empty(),
        };
        public_share_object(activities);
    }

    // 创建活动
    public entry fun create_activity(
     
      activities: &mut Activities,
     // duration:u64,
      info: String, 
      start_time:u64,
      end_time:u64,
      fare:u64,
      max_people:u64,
      ctx: &mut TxContext) {
        let new_activity = Activiti {
            id: object::new(ctx),
            info,
            start_time,
            end_time,
            fare,
            max_people,
            admin: ctx.sender(),
        };
        let new_address =uid_to_address(&new_activity.id);
        vector::push_back(&mut activities.all, new_address); //加入
        public_share_object(new_activity);
    }


     //设置管理员，看调用者是否为活动发起者。index_of获取活动是否存在
     //我需要验证某个函数的调用者是否为活动的发起者
     //活动自带管理员
     //所以需要传入address参数以验证是否相同，相同就是管理员

     //通过活动的admin的admin
     public(package) fun is_admin(
       activity:&Activiti,
       member:address
       ):bool
     {
       if(activity.admin == member){
          true
       }
       else{
          false
       }
     }


    // 创建之后apply,申请活动
    public entry fun apply(_admin: &F_Admin, activity: &Activiti, activities: &mut Activities, ctx: &mut TxContext) {

        let  apply_address = uid_to_address(&activity.id);

        let exists = vector::contains(&activities.all, &apply_address); // 使用值而不是引用
        assert!(!exists, 1); // 如果活动已存在，抛出错误
        vector::push_back(&mut activities.all, apply_address); // 使用值而不是引用
    }

   //更新活动信息
   public entry fun update_activity(
        activity: &mut Activiti,
        info: String,
        start_time:u64,
        end_time:u64,
        fare:u64,
        max_people:u64,
        ctx: &mut TxContext
    ){
        //先判断活动的修改者是否是活动的发起者
        assert!(activity.admin == ctx.sender(), 1); // 如果不是发起者，抛出错误
        //更新活动信息
        activity.info = info;
        activity.start_time = start_time;
        activity.end_time = end_time;
        activity.fare = fare;
        activity.max_people = max_people;
    }
   
    
    // 删除活动
    public entry fun delete_activity(
        activity: &mut Activiti,
        activities: &mut Activities,
        ctx: &mut TxContext
    ) {
        // 先判断活动的删除者是否是活动的发起者
        assert!(activity.admin == ctx.sender(), 1); // 如果不是发起者，抛出错误
        // 删除活动
        let delete_address = uid_to_address(&activity.id);
        let (con,index) = vector::index_of(&activities.all, &delete_address); // 使用值而不是引用
        assert!(con, 2); // 如果活动不存在，抛出错误
        vector::remove(&mut activities.all, index); // 使用值而不是引用
    }

    // 验证活动的创建者和创建门票的人是否是同一个人
    public(package) fun create_tickets_verify(
        activity: &Activiti,
        ctx: &mut TxContext
    ) {
        if (!(activity.admin == ctx.sender())) {
            abort ErrNotActivityCreator;
        }
    }

    // 获取活动的objectID
    public fun get_activity_id(activity: &Activiti): address {
        uid_to_address(&activity.id)
    }


    //
    //线下活动验证
}