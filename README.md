# bootstrap-pagination

#基于bootstrap的ajax分页插件
***

<div class="container">
    <div id="table">
        <table class="table table-hover">
            <thead>
            <tr>
                <th>姓名</th>
                <th>姓名</th>
                <th>姓名</th>
                <th>姓名</th>
            </tr>
            </thead>
            <tbody id="tbody">
            <tr>
                <td>张三</td>
                <td>张三</td>
                <td>张三</td>
                <td>张三</td>
            </tr>
            <tr>
                <td>张三</td>
                <td>张三</td>
                <td>张三</td>
                <td>张三</td>
            </tr>
            <tr>
                <td>张三</td>
                <td>张三</td>
                <td>张三</td>
                <td>张三</td>
            </tr>
            <tr>
                <td>张三</td>
                <td>张三</td>
                <td>张三</td>
                <td>张三</td>
            </tr>
            </tbody>
        </table>
    </div>
</div>

<div id="page"></div>
<form action="" id="form">
    <input type="text" name="name" value="">
    <input type="text" name="phone" value="">
    <input type="text" name="email" value="">
    <button type="button" onclick="page()">提交</button>
</form>
```
<script src="js/pagination.js"></script>
<script type="text/javascript">
  $("#page").pagination({
    url: 'list',
    data: $("#search-form").serialize(),
    callback: function(data) {
      var html = [];
      $.each(data,function(i) {
        html.push("<tr><td>"+data[i]+"</td><td>张三</td><td>张三</td><td>张三</td></tr>");
      });
      $("#tbody").html(html.join(""));
    }
  })
</script>
```
