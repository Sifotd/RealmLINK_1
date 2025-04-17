module rwa::admin{
   //const ADMIN_ADDRESS: address = "0xdc7e6093b8a30bb178b813769c7969719db4e5a9242cdbb5b1888e2cef7b413e";

    const NOT_ADMIN :u64 =1;
    const IN_ADMINS: u64 =2;
    const NOT_ADMINS:u64 =3;
    use sui::transfer::{public_transfer};
    use std::vector::{empty,contains};

   
    public struct Roledata has key, store{
         id:UID,
         roles:vector<address>,
    }

    public struct F_Admin has key,store{
        id:UID,
        admin:address,
    }
 
    // 管理员和管理员们
    fun init (ctx:&mut TxContext){
        
        let  mut admins  = Roledata{
            id:object::new(ctx),
            roles:vector::empty(),
        };
        //初始化最高管理者
        let f_admin =F_Admin{
        id:object::new(ctx),
        admin:ctx.sender(),
        };
        //将当前合约的发起者加入管理员列表
        vector::push_back(&mut admins.roles,ctx.sender());
        public_transfer(admins,ctx.sender());
        public_transfer(f_admin,ctx.sender());
    }

    

    //增加管理员
    public entry fun add_admins(admins:&mut Roledata,add_admin:address,ctx:&TxContext){
        // assert(ctx.sender()!=ADMIN_ADDRESS,NOT_ADMIN);
        //判断管理员是否已经存在
       assert!(vector::contains(&admins.roles,&add_admin),IN_ADMINS);

       //不存在，直接添加
       vector::push_back(&mut admins.roles,add_admin);

    }
    //移除管理员,后面增加批量移除
    public entry fun remove_admins(admins:&mut Roledata,remove:address,ctx:& TxContext){
        //判断是否在名单中并返回索引
        let (exit,index) =vector::index_of(&admins.roles,&remove);
        //如果存在，移除
        if(exit){
            vector::swap_remove(&mut admins.roles,index);
        };

    }
    
    
}