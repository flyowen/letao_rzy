$(function () {
var currentPage =1;//当前页
var pageSize = 5;//每页多少条
render();
function render() {
  $.ajax({
    type:'get',
    url:'/category/queryTopCategoryPaging',
    data: {
    page:currentPage,
    pageSize:pageSize,
    },
    success:function (info) {
      var htmlStr= template('firstTpl',info);
      $('tbody').html(htmlStr);

      //2.完成分页初始化
      $('#paginator').bootstrapPaginator({
        // 版本号
        bootstrapMajorVersion: 3,
        // 当前页
        currentPage: info.page,
        // 总页数
        totalPages: Math.ceil(info.total / info.size),
        // 给页码添加点击事件
        onPageClicked: function (a, b, c, page) {
          // 更新当前页, 并且重新渲染
          currentPage = page;
          render();
        }
      })
    }
  })
}
//  3.点击添加分类按钮，显示添加模态框
$("#addBtn").click(function () {
  $("#addModal").modal('show');
})
 // 3. 完成添加校验
$('#form').bootstrapValidator({

  // 配置图标
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },

  // 配置需要校验的字段列表
  fields: {
    categoryName: {
      // 配置校验规则
      validators: {
        // 非空校验
        notEmpty: {
          message: '请输入一级分类名称'
        }
      }
    }
  }
});

//4.注册表单校验成功事件，在事件中阻止默认的提交，通过ajax提交即可
$('#form').on('success.form.bv',function (e) {
   e.preventDefault();//阻止默认的提交
   
   $.ajax({
     type:'post',
     url:'/category/addTopCategory',
     data: $('#form').serialize(),
     dataType:'json',
     success:function (info) {
       if (info.success) {
        $('#addModal').modal('hide');
        currentPage= 1;
        render();
        $('#form').data('bootstrapValidator').resetForm(true);
       }
     }
   })
})
    
})