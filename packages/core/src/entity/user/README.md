### Meta
用户实体的元信息，主要存储附加信息，非所有用户共有的数据，当前存储了

- 客户信息 Customer

  此数据是当普通用户成为客户时才会拥有的数据信息，包含
```
/**
 * 客户信息
 */
export class Customer {
  //账户属性(账户状态)
  @Property()
  account_state?: number;

  //所属企业
  @Property()
  company?: BindCompany;

  constructor(state: number, company?: BindCompany) {
    this.account_state = state;
    this.company = company;
  }

}
```

- 微信用户关联信息

  当微信用户绑定了此客户后同步的微信用户信息
