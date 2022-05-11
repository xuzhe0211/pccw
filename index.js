/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (keys, objs) => {
    return objs.map(item => {
        let obj = {}
        for (let key in item) {
            if (!keys.includes(key)) {
                obj[key] = item[key]
            }
        }
        return obj;
    })
};
exports.excludeByProperty = (exclude, objs) => {
    return objs.filter(item => {
        return !Object.keys(item).includes(exclude)
    })
};
exports.sumDeep = (objs) => {
    return objs.map(item => {
        for (let key in item) {
            item[key] = item[key].reduce((acc, cur) =>{
                return acc +  cur.val
            }, 0)
        }
        return item;
    })
};
exports.applyStatusColor = (colors, statuss) => {
    return statuss.filter(item => {
        for(let key in colors) {
            if (colors[key].includes(item.status)) {
                item.color = key;
                return item;
            }
        }
    })
};
exports.createGreeting = (func, ...args) => {
    return function(...args2) {
        return func.apply(this, [...args, ...args2])
    }
};
exports.setDefaults = (args) => {
    return function(newArgs) {
        return {...args, ...newArgs};
    }
};
exports.fetchUserByNameAndUsersCompany = (key, services) => {
    return new Promise(async (resolve, reject) => {
        let res = {};
        const callbackHanlder = [];
        const user = await services.fetchUsers();
        res.user = user.filter(item => item.name === key)[0]
        delete services.fetchUsers;
        for (let p in services) {
            callbackHanlder.push(services[p](res.user.companyId))
        }
        const result = await Promise.all(callbackHanlder)
        res.status = result[0]
        res.company = result[1]
        resolve(res);
    })
};
