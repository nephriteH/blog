---
title: "nginx安装"
date: "2023-03-16"
id: '2023031607'
---

### 1. 安装gcc环境
```
yum install gcc-c++
```

### 2. 安装其他依赖
```
yum -y install gcc zlib zlib-devel pcre-devel openssl openssl-devel
```

### 3. 下载nginx安装包

> 安装包最新地址在[nginx官网](https://nginx.org/download/)查询 

```
wget https://nginx.org/download/nginx-1.23.1.tar.gz
```

### 2. 解压

```
tar -xvf nginx-1.23.1.tar.gz
```

### 3. 将文件夹移动到对应的目录下

> 一般都是 `/usr/local/`; 看个人喜好吧，注意这里文件夹名别改成nginx，不然会和后面的步骤冲突

```
mv nginx-1.23.1  /usr/local/
```

### 4. 进入nginx-1.23.1目录中
> 这里必须进入移动后的目录中，后面的命令需要在这个目录下才能执行
```
cd /usr/local/nginx-1.23.1
```
### 5. 安装依赖模块
```
./configure --with-http_stub_status_module --with-http_ssl_module
```

### 6. 安装nginx
> 这里是两个命令，分别执行一下。执行完会在上级目录'/usr/local/'中生成nginx文件夹，这就是为什么第3步中不要给文件夹改名的原因
```
make
make install
```

### 7. 启动nginx
```
/usr/local/nginx/sbin/nginx 
```
---
## 安装到此就完成了
---

### 将nginx添加到全局环境变量中，之后使用方便
> 注意目录 */usr/local/nginx/sbin/nginx* 根据自己的实际情况来
```
ln -s /usr/local/nginx/sbin/nginx /usr/local/bin/
```

```
nginx  //启动
nginx -t //验证nginx.conf文件配置是否正确
nginx -s reload //重启
```