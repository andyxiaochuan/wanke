**Guppy —— “互联网+”品牌中心**

# FAQ

### 如何准备NodeJS环境？ ###

如果没有安装cnpm，安装cnpm：
```
npm install -g cnpm --registry=https://registry.npm.taobao.org 
```

安装必要的包：
```
cnpm install
```

### 如何在本地开发调试？ ###

答：初次搭建环境，按如下步骤：
1. 启动start_server.bat
2. 访问 `http://127.0.0.1:3000/`

### 如何集成到Ningx？ ###
1. 在hosts文件中添加如下域名
```
127.0.0.1 dev.guppy.com
127.0.0.1 mongo.guppy.com
127.0.0.1 redis.guppy.com
```
2. 编辑Nginx的`nginx.conf`文件，添加如下配置
```python
server {
        listen 80;
        server_name dev.guppy.com;

        root D:/guppy/guppy/web/; #这里要换成自己的目录

        location / {
            proxy_pass http://127.0.0.1:3000; 
        }

        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }
```