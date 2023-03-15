#### 什么是CocoaPods

CocoaPods负责管理iOS项目中第三方框架。CocoaPods的项目源码在Github上管理。项目从2011年8月12日开始,CocoaPods的出现使得我们可以节省设置和更新第三方开源库的时间。

***

#### 如何制作自己的Pod库

制作Pod库需要先安装CocoaPods，关于CocoaPods的安装传送门：https://www.jianshu.com/p/1bb0ad42cb2e

***

#### 创建工程

创建Xcode工程，和正常工程一样，git忽略文件什么都添加，然后提交代码到gitHub或者gitLab上

***

#### 创建.podspec文件

cd到工程目录下，创建.podspec文件


```
// 这里的TSBasicsKit就是你制作库的名字
pod spec create TSBasicsKit
```
***

#### 编辑.podspec文件

将创建好的.podspec文件add到工程里进行编辑，这里也可以使用vim来编辑或者其他编译器，使用xcode编辑会更方便一些

打开.podspec文件后会看到好多关于设置的注释，整理之后主要信息如下


```
Pod::Spec.new do |s|

  s.name         = "TSBasicsKit"
  s.version      = "1.0.0"
  s.platform     = :ios, "10.0"

  s.summary      = "this is a practice project of pod."
  s.homepage     = "https://www.apple.com"
  s.license              = { :type => "MIT", :file => "LICENSE" }
  s.author             = { "xcode" => "xcode@apple.com" }
  s.social_media_url   = "https://www.jianshu.com/u/8a7102c0b777"

  s.source       = { :git => "http://gitlab.caiqr.com/renpengjie/PodText.git", :tag => s.version }
  s.source_files  = "TSBasicsKit/code/*"

  s.framework  = "UIKit","Foundation"
  s.swift_version = '4.2'
  s.requires_arc = true

end
```
下面介绍各参数的含义


```
Pod::Spec.new do |s|
  
  # 名称，pod search搜索的关键词,注意这里一定要和pod spec create TSBasicsKit中的名称一样,否则报错
  s.name         = "TSBasicsKit"
  
  # 版本号
  s.version      = "1.0.0"
  
  # 支持的pod的最低系统版本（已过期），改为使用s.platform
  #s.ios.deployment_target = 10.0'
  s.platform     = :ios, "10.0"

  # 库的简介
  s.summary      = "this is a practice project of pod."
  
  # 项目主页地址
  s.homepage     = "https://www.apple.com"
  
  # 许可证 （固定写法，还不清楚为什么要这样写）
  s.license              = { :type => "MIT", :file => "LICENSE" }
  
  // 作者 填自己的名字和邮箱或者什么的 不是太重要
  s.author             = { "xcode" => "xcode@apple.com" }
  
  // 社交地址
  s.social_media_url   = "https://www.jianshu.com/u/8a7102c0b777"

  # 项目的地址（这个必须写正确）
  # 其他关联方式
  # 将这个Pod版本与Git仓库中某个commit绑定
  # s.source       = { :git => "http://gitlab.caiqr.com/renpengjie/UIBasicsKit.git", :commit => 56basfet }
  
  # s.source       = { :git => "http://gitlab.caiqr.com/renpengjie/UIBasicsKit.git", :tag => 1.0.0 }
  s.source       = { :git => "http://gitlab.caiqr.com/renpengjie/UIBasicsKit.git", :tag => s.version }
  
  # 需要包含的源文件
  # 源文件的其他写法
  # *匹配所有文件
  # s.source_files  = "TSBasicsKit/*"
  # *.{h,m}匹配所有.h和.m结尾的文件
  # s.source_files  ="TSBasicsKit/*.{h,m}"
  # **表示匹配所有子目录
  # s.source_files  ="TSBasicsKit/**/*.h"
  # 不能直接匹配根目录下所有文件，直接匹配会把AppDelegate、Main.storyboard都引入，
  # 匹配单个文件
  # 引用多个用逗号隔开
  s.source_files  = "TSBasicsKit/ViewController.swift"
  
  #资源文件
  #s.resources          = "TSBasicsKit/TSTest.bundle"

  # 用到的系统库
  s.framework  = "UIKit","Foundation"
  
  # 如果是swfit编写，需要制定swfit语言版本
  s.swift_version = '4.2'
  
  # 是否需要ARC自动管理内存
  s.requires_arc = true
  
  # 依赖库，不能依赖未发布的库
  s.dependency  = 'AFNetworking'
  
  # 如果需要多个依赖库,不是用逗号分隔
  # s.dependency  = 'SnapKit'
  # s.dependency  = 'AFNetworking'
  

end

```
***

#### 创建LICENSE(许可证/授权文件)

在工程目录下执行命令

```
touch LICENSE
open LICENSE 
```
然后复制下面内容到文件里并保存 （PS：注意修改Copyright相关信息）


```
Copyright (c) 2019-2029 TSBasicsKit Software Foundation (https://github.com/xxx/TSBasicsKit/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
#### 提交Git

将创建的.spec、LICENSE文件及功能代码提交Git

***

#### 打tag

cocoapods依赖tag版本查找代码，必须打tag
这里是命令打tag,也可以去github上手动打tag

```
//为git打tag, 第一次需要在前面加一个v 
git tag "v1.0.0" 
//将tag推送到远程仓库
git push --tags 
```
（PS：实话说这里我并不知道为什么第一次tag需要加“v”，但是有大佬之前这么说过，所以就这么做了）
***

#### 验证.podspec文件

```
// --verbose 参数代表检查时是否显示信息
pod spec lint TSBasicsKit.podspec --verbose
```
一定要仔细检查.podspec文件里面的参数是否正确，参数不对会出现很多坑，一定要检查！检查！检查！

如果有报错，就百度吧，遇到的坑大佬都填过了


```
// 如果使用了其他私有库，需要指定其他私有库的仓库地址和公有库仓库的地址
pod spec lint TSBasicsKit.podspec --verbose --sources='私有库地址,https://github.com/CocoaPods/Specs.git'
```


***

#### 创建一个仓库工程

创建一个空工程，里面用于存放你的pod工程的.podspec文件，你可以理解为一个仓库

这里建了一个为名PodRepoTest的工程

- PS：制作第一个私有库需要执行，之后制作其他私有库不需要在创建（除非新私有库需要存在新的仓库中）

***

#### 执行下面的命令，将仓库工程关联到pod中

本地仓库文件夹起名为：PrivatePodRepo

```
pod repo add PrivatePodRepo git@gitlab.caiqr.com:renpengjie/PodRepoTest.git
```

- PS: 此时在 ~/.cocoapods/repos/ 中会出现PrivatePodRepo 文件夹
- 
***

#### 上传.podspec文件

将私有库的.spec文件上传到到PrivatePodRepo仓库里
```
pod repo push PrivatePodRepo TSBasicsKit.podspec
```

到此为止私有库就制作完成了

***

#### 使用私有库

在podfile中顶部添加

```
// 如果使用了私有库，必须添加共有库的路径
source 'https://github.com/CocoaPods/Specs.git'
// 私有库地址（存放pod私有库的仓库地址）
source 'http://gitlab.caiqr.com/renpengjie/PodRepoTest.git'

# 指定版本
pod TSBasicsKit, '1.0.0'
# 默认新版版本
pod TSBasicsKit

```

***

#### 设置Xcode命令行工具

Xcode->Preferences->Locations->Command Line Tools->选上

不设置的话，在验证的时候会报错错误信息


```
- ERROR | [iOS] unknown: Encountered an unknown error (/usr/bin/xcrun simctl list -j devices

xcrun: error: unable to find utility "simctl", not a developer tool or in PATH
) during validation.

[!] The spec did not pass validation, due to 1 error.
```

***

#### 参考文献：

https://www.jianshu.com/p/211f0cf79190

https://www.jianshu.com/p/1427a55c27be

https://www.jianshu.com/p/8a7b9232cbab