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
        //判断是否是登录方法
        if(!("loginAdmin".equals(proxy.getMethod()) || "isLoginAdmin".equals(proxy.getMethod()))){
            if(LimitlessUtils.getLoginAdmin() == null){
                //没有登陆
                return "error";
            }else{
                //当前用户已经登陆
                return actionInvocation.invoke();
            }
        }else{
            //当前用户正在登陆
            return actionInvocation.invoke();
        }
    }
}
