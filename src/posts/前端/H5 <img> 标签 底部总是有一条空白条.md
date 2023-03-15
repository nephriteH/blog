<!-- wp:heading -->
<h2>现象：</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><img> 标签底部总是会有一条空白缝隙，高度不一定，有时候是2px，有时候是4px。<br><img class="wp-image-161" style="width: 500px;" src="http://huangyc.cn/blog/wp-content/uploads/2021/06/8A5E0878-0C26-4E1D-BFE4-92607412365D.png" alt=""></p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>原因：</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>img标签为行内替换元素，默认对其方式为vertical-align: baseline(基线对齐) ，而基线位置会受到不同的字体和字体大小影响，所以在某些时候，图片底部会有一条空白线。如果不明白什么是基线，可以自行百度。</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2>解决方案：</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>方案一：（直接修改对齐方式）</p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p><img> 设置属性： vertical-align：bottom;</p></blockquote>
<!-- /wp:quote -->

<!-- wp:paragraph -->
<p>方案二：</p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p><img> 设置属性： display: block;</p></blockquote>
<!-- /wp:quote -->

<!-- wp:paragraph -->
<p>方案三：</p>
<!-- /wp:paragraph -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p>将img标签的父容器设属性：font-size: 0;</p></blockquote>
<!-- /wp:quote -->

<!-- wp:heading {"level":3} -->
<h3>结语：</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>因为这个现象其实不是bug，只是一个默认属性导致的现象，所以还有很多其他解决方案，上面几个是最常见也是最直观的解决办法。</p>
<!-- /wp:paragraph -->