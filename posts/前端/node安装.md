---
title: "node安装"
date: "2023-03-16"
id: '2023031608'
---

### 1. 下载node安装包

> 安装包最新地址在[node官网](https://nodejs.org/zh-cn/download/)查询 

```

wget https://nodejs.org/dist/v16.17.1/node-v16.17.1-linux-x64.tar.xz
```

### 2. 解压

```

xz -d node-v16.17.1-linux-x64.tar.xz

tar -xvf node-v16.17.1-linux-x64.tar

```

### 3. 将文件夹移动到对应的目录下

> 一般都是 `/usr/local/ ` 看个人喜好吧

```
mv node-v16.17.1-linux-x64  /usr/local/
```
### 4. 将文件夹重命名为node
> 改不改随意，只是改成node更方便
```
mv /usr/local/node-v16.17.1-linux-x64/  /usr/local/node
```

### 5. 修改profile
```
vim /etc/profile
```
> 在文件中加入下面两行内容，这里注意一下路径，主要看你第3步和第4步怎么做的。
```
export NODE_HOME=/usr/local/node
export PATH=$NODE_HOME/bin:$PATH
```

### 6. 将修改内容立即生效
```
source /etc/profile
```

### 7. 验证一下
```
node -v
npm -v
```
