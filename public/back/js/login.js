$(function () {
  /*
$(function() {
  /*
   * 1. 进行表单校验配置
   *    校验要求:
   *        (1) 用户名不能为空, 长度为2-6位
   *        (2) 密码不能为空, 长度为6-12位
   * */

  // 进行表单校验初始化
  $('#form').bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 字段列表  field,  要先在 input 中配置 name 属性
    fields: {
      // 用户名
      username: {
        // 校验规则
        validators: {
          // 非空
          notEmpty: {
            // 提示信息
            message: '用户名不能为空'
          },
          // 长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度为2-6位'
          },
          callback: {
          message:'用户名不存在'
          }
        }
      },
      // 密码
      password: {
        // 配置校验规则
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须是6-12位'
          },
          callback: {
            message:'密码错误'
          }
        }
      }
    }
  })

/*
2. 使用submit 按钮， 会进行表单提交，此时表单校验插件会立刻进行校验
(1)校验成功。此时会默认提交，发生页面跳转，注册表单验证成功事件，在事件中阻止默认的时间跳转，发送ajax请求
(2)校验失败，自动拦截提交

注册表单校验成功事件，在事件中阻止默认的提交，通过ajax请求

*/
$('#form').on('success.form.bv',function (e) {
  //阻止默认的提交
  e.preventDefault();
  $.ajax({
    type:'post',
    url:'/employee/employeeLogin',
    data:$('#form').serialize(),
    
    dataType:'json',
  
    success:function ( info) {
      
      console.log( info );
 
      if (info.error == 1000) {
      $('#form').data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback');
      }
      if (info.error == 1001) {
       $('#form').data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback');
      }
      if (info.success) {
        //登录成功，跳转首页
        location.href = 'index.html';
      }
    }
  })
});
/* 
    3.表单重置功能
      reset 按钮， 本身可以重置内容，所以此时只需要重置状态即可
      resetForm(flase); 只重置状态
      resetForm(true);重置内容和状态
*/
$('[type="reset"]').click(function() {
  // 重置状态即可
  $('#form').data('bootstrapValidator').resetForm();
})
});