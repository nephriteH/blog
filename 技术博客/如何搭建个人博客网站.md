<!-- wp:heading -->
<h2>时间：2021年06月01日</h2>
<!-- /wp:heading -->

<!-- wp:image {"id":80,"width":828,"height":552,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="http://47.93.11.247/blog/wp-content/uploads/2021/06/0d6866ff8e726a9ef9649068e5887230.jpeg" alt="" class="wp-image-80" width="828" height="552"/></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>最近准备搭建一个个人博客网站，以便分享和记录一些自己在工作生活中的遇到的一些问题以及解决问题的思路和方案，百度一搜如何搭建博客就能搜到全是用的wordpress,所以我也就从众一下，本来以为找一篇搭建教程按照步骤一步一步来就行了，结果全是坑，下边就记录一下自己搭建个人博客网站的详细过程，以便各位道友参考，少走坑路。</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>一、购买服务器</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>买服务器买哪家服务器都可以，我这里是在阿里云购买的，有一个新人活动，很便宜80多一年。我这里多说几句，就是我当时是赶上一个618活动，50多一年，但是我没买那个，原因是618活动买的服务器之后续费是按原价续费，而新人活动的续费是可以按活动价续费3次，所以长远来看还是新人活动更划算。说这些就是想提醒一下，不管你是买哪家的服务器，买的时候可以简单看下活动说明，看看哪个更划算，别看哪个便宜就买哪个。（当然土豪可以忽略！）</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>以下以阿里云服务器，Ubuntu系统为例</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>1.买完服务器后进入【控制台】，ECS实例列表页面，点击进入对应的实例(其实就是那台服务器)。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>2. 找到【重置实例密码】，修改登录这台服务器的密码。修改完之后需要重启一下服务器，使密码生效。<img class="wp-image-88" style="width: 1500px;" src="http://47.93.11.247/blog/wp-content/uploads/2021/06/33953A5C-93AB-4DB7-A7B0-5BBCDDDA0A89.png" alt=""></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>3. 登录你的服务器。这里有两种方式:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>  a.直接点击【远程连接】>【Workbench远程连接】，输入密码，就进入服务器里了</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>  b. 复制实例的公网IP地址，打开电脑上命令行终端工具 : Windows: Powershell;  Mac: Terminal</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>1.ssh root@公网ip
2.输入密码
3.输入yes</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>显示 welcome to .... 表示进入服务器成功。</p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p>PS：如果未安装ssh工具，可以自行百度一下，安装SSH工具</p></blockquote>
<!-- /wp:quote -->

<!-- wp:heading -->
<h2>二、购买域名</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>买域名分国内和国外，在国内买域名基本就是去万网，也就是阿里云（阿里云收购了万网）。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><br>1.买完域名后，首先需要实名认证。认证时间一般是1天内就好了，我大约是几个小时之后就发短信通知我了。<br>2.认证成功后需要将域名解析到你之前买的服务器上。进入【域名列表】，找到对应的域名右侧有一个【解析】按钮。<img class="wp-image-109" style="width: 1500px;" src="http://47.93.11.247/blog/wp-content/uploads/2021/06/01CE2B85-8379-4762-94EB-A408B8F0648B.png" alt=""><br>3.点击【添加记录】<br><img class="wp-image-110" style="width: 1500px;" src="http://47.93.11.247/blog/wp-content/uploads/2021/06/20210602152729.jpg" alt=""><br>4.将【公网ip地址】填加到【记录值】，其他选项可以不用填。点击【确认】即可。到这一步访问域名就可以访问到你的服务器了。但在国内买的域名需要先去管局备案，否则无法访问。<br>5.备案。 阿里云提供了备案服务，土豪可以直接买备案管家，我们只能自己免费备案。备案的时候需要注意的两个点：<br> a. 网站名称；<br>个人网站名称必须与网站内容有关联性。<br>个人网站名称请勿涉及个人姓名、地名；个人网站名称请不要用纯数字或字母组成，不能包含特殊符号；网站名称请使用3个以上汉字命名，请不要使用XXX个人空间、资讯、网站、网络、网址、技术、信息、爱好者、家园、作品展示、工作室、平台、主页、热线、社团、导航、搜索；这样的格式命名网站；网站名称中不要带有博客、论坛、在线、社区、交流等字样,若要带有此类信息，需提交前置审批文件;个人网站名称不能使用成语。 <br> b.网站备注；<br>网站备注必须说明网站用途与内容，并且必须大于20个字。<br></p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>三、搭建环境</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>我们总共需要在服务器上安装三个东西，apache、mysql、php。<br>    这里我想说一下，网上很多教程可能是几年前的，有些细节上的安装步骤可能发生了变化，导致你在安装某一步时总是报错或者被卡住了，这时候别着急放弃这篇教程，你被谁卡住了你就去搜谁的安装教程。例如：安装mysql时报错，你就百度搜索最新的Ubuntu系统下mysql安装教程，不要再搜索博客搭建的教程。<br>    我在搭建环境的时候一旦被卡就会觉得是这篇教程过期了出问题了，就会去找别的博客搭建教程，结果每篇教程都或多或少的会出现一些问题，搞了我两三天。<br>    其实这里陷入了思维误区，并不是某篇教程出问题了，只是由于时间问题，某些步骤随着更新换代已经不需要了或者被换成别的了。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>总结一下就是，你就是需要在服务器上搭建 apache、mysql、php这三个环境，他们三个不是绑定关系。甚至如果你懂nignx的话完全可以把apache换成nignx。</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>首先进入服务器后，更新一下apt库资源 (如果你是CentOS系统，那更新的是yum库)</h3>
<!-- /wp:heading -->

<!-- wp:code -->
<pre class="wp-block-code"><code>apt-get update</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code>apt-get upgrade</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3>1.安装apache，并启动</h3>
<!-- /wp:heading -->

<!-- wp:code -->
<pre class="wp-block-code"><code>sudo apt-get install apache2
/etc/init.d/apache2 start</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p><span class="has-inline-color has-vivid-red-color">到这一步很多教程上就让你去浏览器验证了，其实这里差了很重要的一步，坑了我整整一天。</span>我去浏览器上怎么验证都不成功，一直以为是apache没有安装成功，卸载重装甚至更换系统都不行。<br>apache服务对应的端口是80端口，阿里云默认只开放22端口。在度娘里查到如何开放80端口，那些教程都没用，必须去阿里云控制台配置安全组规则。</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>ECS控制台，【左侧菜单页】>【网络与安全】>【安全组】，找到对应的实例，右侧有一些蓝字【配置规则】<img class="wp-image-119" style="width: 1500px;" src="http://47.93.11.247/blog/wp-content/uploads/2021/06/20210602163615.jpg" alt=""><br>【手动添加】优先级:100； 端口范围:80； 授权对象：源:0.0.0.0/0； 其他默认即可<br><img class="wp-image-120" style="width: 1500px;" src="http://47.93.11.247/blog/wp-content/uploads/2021/06/1E2EB7AD-527A-4675-870E-8743FD6CC0B8.png" alt=""></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>在浏览器里键入 http://公网IP 验证一下，如看到WEB页面，则表示Apache服务已经安装成功<br><img class="wp-image-122" style="width: 500px;" src="http://47.93.11.247/blog/wp-content/uploads/2021/06/20210602164129.jpg" alt=""></p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>2.安装mysql</h3>
<!-- /wp:heading -->

<!-- wp:code -->
<pre class="wp-block-code"><code>sudo apt-get install mysql-server</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3>3.安装php</h3>
<!-- /wp:heading -->

<!-- wp:code -->
<pre class="wp-block-code"><code>sudo apt-get install php
# 这样安装的是最新的php版本，如果你需要指定版本则在php后跟上版本。即：sudo apt-get install php7.0</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code>sudo apt-get install libapache2-mod-php
# 如果你上一步指定了版本，这里也需要指定对应的版本。即：sudo apt-get install libapache2-mod-php7.0</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code>sudo a2enmod php
# 这里同上！即：sudo a2enmod php7.0</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3>4.安装完成以上三步后，重启一下apache服务</h3>
<!-- /wp:heading -->

<!-- wp:code -->
<pre class="wp-block-code"><code>/etc/init.d/apache2 restart</code></pre>
<!-- /wp:code -->

<!-- wp:heading -->
<h2>5.验证一下php环境是否成功</h2>
<!-- /wp:heading -->

<!-- wp:code -->
<pre class="wp-block-code"><code>cd /var/www/html/;
vim test.php;</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>编辑内容为：</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code><?php phpinfo(); ?></code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>如果你不会vim编辑，可以自行百度一下，很简单。<br>保存后在浏览器输入: http://公网IP/test.php，出现对应的php网页即表示成功。<br><img class="wp-image-127" style="width: 500px;" src="http://47.93.11.247/blog/wp-content/uploads/2021/06/20210602165942.jpg" alt=""></p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>四、安装wordpress</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>进入服务器，进入/var/www/html/， 这个目录下的内容就是我们在浏览器里访问这台服务器时访问的内容。<br>在验证apache那一步中，浏览器访问http://公网IP，出现的页面其实就是这个目录下的index.html。如果你修改index.html内容，浏览器中对应的页面也会发生变化。</p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>#进入目录
cd /var/www/html/</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code>#下载wordpress
wget https://cn.wordpress.org/latest-zh_CN.tar.gz</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>这里的下载地址是默认最新版本，如果你需要要指定版本，可以到这个地址官方地址里找<a href="https://cn.wordpress.org/download/releases/" target="_blank" rel="noreferrer noopener">https://cn.wordpress.org/download/releases/</a></p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>#下载好后解压，得到wordpress 目录
tar -xvf latest-zh_CN.tar.gz</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p>到这一步wordpress 算是下载安装好了，接下来需要绑定一下数据库就大功告成了。</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3>创建数据库</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><span class="has-inline-color has-vivid-red-color">我们主要需要做的就是三步：1.创建数据库表；2.创建用户与密码；3.授权用户并生效；</span><br>下面是以mysql 8.0.25版本为例，如果你安装的是一些低版本或者更高版本，也许命令会报错，可以自行百度。<br>在你进入mysql的时候会出现一些基本信息，这里便可查看自己的版本。<br><img class="wp-image-132" style="width: 700px;" src="http://47.93.11.247/blog/wp-content/uploads/2021/06/2005194C-BEF2-4507-96F0-81038274C959.png" alt=""></p>
<!-- /wp:paragraph -->

<!-- wp:code -->
<pre class="wp-block-code"><code>#进入mysql，默认无密码，直接回车即可。
mysql -u root -p</code></pre>
<!-- /wp:code -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p># 注意所有数据库相关命令最后需要加 ’;‘，如果你不加，回车后不会执行命令，会认为你是在连续输入命令语句。</p></blockquote>
<!-- /wp:quote -->

<!-- wp:code -->
<pre class="wp-block-code"><code># 创建数据库表； 'databasename'可以修改为你想要的名字
mysql> create database databasename;

Query OK, 1 row affected (0.00 sec)</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code># 创建用户； 'username'和'password'，分别代码用户名和密码，可以自行修改
mysql> create user 'username'@'%' identified by 'password';

Query OK, 0 rows affected (0.09 sec)</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code>#授权用户； 注意这里有两个username，都是你上一步的username。
mysql> grant all privileges on username.* to 'username'@'%';

Query OK, 0 rows affected (0.10 sec)</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code># 使授权生效
mysql> flush privileges;

Query OK, 0 rows affected (0.01 sec)</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code># 退出mysql
mysql> \q</code></pre>
<!-- /wp:code -->

<!-- wp:heading {"level":3} -->
<h3>修改配置文件</h3>
<!-- /wp:heading -->

<!-- wp:code -->
<pre class="wp-block-code"><code># 进入 wordpress 文件夹
cd /var/www/html/wordpress/</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code># 将范例配置文件修改为真正的配置文件
mv wp-config-sample.php wp-config.php</code></pre>
<!-- /wp:code -->

<!-- wp:code -->
<pre class="wp-block-code"><code># 编辑配置文件，需要一点vim编辑基础，可以自行百度，很简单，会【输入】【保存】【退出】即可。
vim wp-config.php</code></pre>
<!-- /wp:code -->

<!-- wp:paragraph -->
<p><strong>将你创建数据库时的【databasename】【username】【password】修改到对应的位置，保存退出即可。</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":137,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="http://47.93.11.247/blog/wp-content/uploads/2021/06/20210603115657.jpg" alt="" class="wp-image-137"/></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2>好啦！现在到浏览器上访问: http://公网ip/wordpress/</h2>
<!-- /wp:heading -->

<!-- wp:heading -->
<h2>大功告成！开始搞事情吧~~~</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>PS: 之后等你的域名备案成功后将公网ip换成域名即可！</p>
<!-- /wp:paragraph -->