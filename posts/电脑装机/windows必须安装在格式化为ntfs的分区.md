---
title: "windows必须安装在格式化为ntfs的分区"
date: "2023-03-16"
id: '2023031601'
---

## 一  安装win10的时候提示：windows必须安装在格式化为ntfs的分区

（1）按Shift+F10出现命令提示符输入：

（2）diskpart                    @这时要使用管理员权限进入diskpart程序；

（3）list  disk                    @查看当前磁盘情况

（4）select  disk    0          @选择需要格式化的磁盘

（5）clean                         @先清除所有磁盘分区

（6）convert    ntfs            @转换成ntfs格式
## 二 安装win10的时候提示：无法创建新的分区，也找不到现有的分区
解决办法：

（1）按Shift+F10出现命令提示符输入：

（2）diskpart                    @这时要使用管理员权限进入diskpart程序；

（3）list  disk                    @查看当前磁盘情况

（4）select  disk    0          @选择需要格式化的磁盘

（5）clean                         @先清除所有磁盘分区

（6）convert  gpt               @将磁盘转换成GPT格式， 根据实际情况如果是legacy启动的就要转mbr格式