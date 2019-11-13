package com.zhuang.limitless.interceptor;

import com.opensymphony.xwork2.ActionInvocation;
import com.opensymphony.xwork2.ActionProxy;
import com.opensymphony.xwork2.interceptor.AbstractInterceptor;
import com.zhuang.limitless.utils.LimitlessUtils;

public class AdminInterceptor extends AbstractInterceptor {
    @Override
    public String intercept(ActionInvocation actionInvocation) throws Exception {
        //获取Action的代理对象
        ActionProxy proxy = actionInvocation.getProxy();
        if (!"loginAdmin".equals(proxy.getMethod())) {
            //先获取当前登陆的用户
            if (LimitlessUtils.getLoginAdmin() == null) {
                //没有登陆
                return "login";
            } else {
                //当前用户已经登陆
                return actionInvocation.invoke();
            }
        } else {
            //当前用户正在登陆
            return actionInvocation.invoke();
        }
    }
}
