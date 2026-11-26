<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ name }}</title>
    <link rel="stylesheet" href="/static/normalize.css">
    <link href="/static/logo.jpg" rel="icon" type="image/x-icon">
<script defer src="http://127.0.0.1:9002/public/dist/dev/js/runtime~entry.page2.4a48bfc0.bundle.js"></script><script defer src="http://127.0.0.1:9002/public/dist/dev/js/common.4312f279.bundle.js"></script><script defer src="http://127.0.0.1:9002/public/dist/dev/js/entry.page2.a47a19c0.bundle.js"></script></head>

<body>
    <div id="root"></div>

    <input id="env" type="input" value="{{env}}" />
    <input id="options" type="input" value="{{options}}" style="display: none;" />
</body>
<script type="text/javascript">
    try {
        window.env = document.getElementById('env').value;
        const options = document.getElementById('options').value;
        window.options = JSON.parse(options);
    } catch (error) {
        console.error(error);
    }
</script>

</html>