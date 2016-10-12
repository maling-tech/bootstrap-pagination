#基于bootstrap的ajax分页插件

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

