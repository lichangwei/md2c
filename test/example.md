# 数据平台接口定义
## 首页
### 获取首页用户信息
`接口`: `Get /data/home/user`
`参数`: -
`响应`: 响应中只描述正常情况，并且只包括`data`字段的值，下同。
```json
{
    total: {
        total: 20000000,
        increase: 20000,
    },
    active: {
        total: 20000000,
        increase: 20000,
    },
    top: {
        total: [{
            tenant: "盖雅工场",
            count: "120000"
        }],
        active: [{
            tenant: "盖雅工场",
            count: "120000"
        }]
    }
}
```

### 获取首页模块
`接口`: `Get /data/home/module`
`参数`: -
`响应`:
```json
{
    module: [{
        name: '考勤打卡',
        count: 20000,
    }],
    tenant: [{
        name: '盖雅工场',
        count: 16,
    }],
}
```

### 获取首页打卡
`接口`: `Get /data/home/punch`
`参数`: -
`响应`:
```json
{
    statistics: [0, 0, 12, 12], //每半小时打卡数
    tenant: [{
        name: '盖雅工场',
        count: 1222,
    }],
}
```

### 获取首页系统
`接口`: `Get /data/mobile/version`
`参数`:
- system: `ios`或`android`

`响应`:
```json
[{
    name: '8.0',
    count: 160000,
}]
```

### 获取首页应用版本
`接口`: `Get /data/app/version`
`参数`: -
`响应`:
```json
[{
    name: '4.0',
    count: 16000,
}]
```

## 用户
### 用户总数
获取截止到今天用户总数以及今天新增。
`接口`: `Get /data/user/total`
`参数`: -
`响应`:
```json
{
    all: {
        total: 1000,
        increase: 20,
    },
    ios: {
        total: 1000,
        increase: -20,
    },
    android: {...}
    h5: {...}
    mp: {...}
}
```

### 用户总数趋势
根据日期区间获取用户总数，
`接口`: `Get /data/user/total/trend`
`参数`:
- startDate: '2018-08-12'
- endDate: '2018-08-18'

`响应`:
```json
[
    {
        date: "2018-08-12",
        all: {
            total: 1500,
            increase: 20, //当日新增
        },
        ios: ...,
        android: ...,
        h5: ...,
        mp: ...,
    },
    //...
]
```
## 活跃用户
接口和用户总数一致，只是`URL`变化了。
`Get /data/user?type=active`。
`Get /data/user/trend?type=active`

## 客户用户数
### 客户用户数
`接口`: `Get /data/tenant/user`
`参数`:
- date: 获取哪一天的数据，比如'2018-08-20'，缺省表示当天。？？？
- top: 数字，获取前几个，缺省获取所有。

`响应`: 这个数据应该从租户平台获取?????????????????
```json
[
    {
        name: "盖雅工场",
        count: 20000,
        increase: 200,
    }
]
```
## 单个客户用户数
接口和用户总数一致，只是`URL`变化了。
`Get /data/tenant/${tenantCode}/user`。
`Get /data/tenant/${tenantCode}/user/trend`

## 单个客户活跃用户数
接口和用户总数一致，只是`URL`变化了。
`Get /data/tenant/${tenantCode}/user?type=active`。
`Get /data/tenant/${tenantCode}/user/trend?type=active`

## 模块使用数
`接口`: `Get /data/module/usage`
`参数`:
- date: 获取哪一天的数据，比如'2018-08-20'，缺省表示当天。
- top: 数字，获取点击数最大的前几个，缺省获取所有。

`响应`: 这个数据应该从租户平台获取?????????????????
```json
[
    {
        name: "考勤打卡",
        count: 20000,
        increase: 200,
    }
]
```
## 单个模块使用数
`接口`: `Get /data/module/${moduleId}/usage`
`参数`:
- date: '2018-08-12 2018-08-18'

`响应`:
```json
{
    "2018-08-12": {
        count: 1500,
        increase: -20
    },
    //...
}
```

## 所有客户模块使用数
## 打卡数据监测
`接口`: `Get /data/punch`
`参数`:
- date: '2018-08-12 2018-08-18'

`响应`:
```json
[
    {
        date: "2018-08-12",
        count: 1500,
        increase: -20
    },
    //...
]
```

## 所有客户打卡数据
`接口`: `Get /data/tenant/punch`
`参数`:
- date: 获取哪一天的打卡数据，比如'2018-08-20'
- 支持分页

`响应`:
```json
[
    {
        tenantCode: 'gaiaworks',
        tenantName: '盖雅工场',
        punchCount: 2000, //打卡总数
        employeeCount: 1000, //打卡人数
    }
]
```

## 单个客户打卡数据
`接口`: `Get /data/tenant/${code}/punch`
`参数`:
- code: 租户代码，必填。
- date: '2018-08-12 2018-08-18'
- 支持分页

`响应`:
```json
[
    {
        date: "2018-08-12",
        punchCount: 2000, //打卡总数
        employeeCount: 1000, //打卡人数
    }
]
```

## 打卡人员详细信息
`接口`: `Get /data/tenant/${code}/punch/date/${date}`
`参数`:
- code: 租户代码，必填。
- date: '2018-08-12'
- query: 查询条件，用于匹配姓名和工号
- 支持分页

`响应`:
```json
[
    {
        employeeId: "1605004",
        employeeName: "Louis Li",
        punchTime: "2018-08-12 08:25:20",
        punchAddress: "盖雅工场三楼"
        //其他字段？？？
    }
]
```

