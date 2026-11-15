<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ name }}</title>
    <link rel="stylesheet" href="/static/normalize.css">
    <link href="/static/logo.jpg" rel="icon" type="image/x-icon">
</head>

<body>
    <h1>Page 1</h1>
    <p>This is the first page of the application.</p>
    <a href="page2.html">Go to Page 2</a>
    <input id="env" type="input" value="{{env}}" />
    <input id="options" type="input" value="{{options}}" />

    <button id="getList" onclick="handleClick()">发送请求</button>
</body>
<script src="http://cdn.bootcss.com/axios/0.18.0/axios.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/js-md5@0.8.3/src/md5.min.js"></script>
<script type="text/javascript">
    try {
        window.env = document.getElementById('env').value;
        const options = document.getElementById('options').value;
        window.options = JSON.parse(options);
    } catch (error) {
        console.error(error);
    }

    const handleClick = () => {
        const signKey = 'klx05hb3n1c9ujp8uhxbs2ikkiowp212';

        const st = Date.now();

        axios.request({
            method: 'get',
            url: '/api/project/list',
            params: {
                proj_key: 'test',
            },
            headers: {
                s_t: st,
                s_sign: md5(`${signKey}_${st}`)
            }
        })
    }
</script>

</html>