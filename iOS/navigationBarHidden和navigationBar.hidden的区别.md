### 相同点：

两者的共同作用都是隐藏导航栏

### 区别：

#### 首先最重要的说明就是两者分别对应了两个属性，不要混为一谈。

```
[UINavigationController setNavigationBarHidden:YES animated:YES];
```

> 上述代码中的`setNavigationBarHidden`是设置`UINavigationController`的`navigationBarHidden`属性，它的作用是隐藏 `UINavigationController`。

```
UINavigationController.navigationBar.hidden = YES;
```

> `UINavigationController.navigationBar.hidden`是设置`UINavigationBar`的`hidden`属性，这个是设置`UINavigationBar`这个 View 的隐藏。

---

### 细节点：

两者一定不能互相套用，`setNavigationBarHidden:YES`后一定要`setNavigationBarHidden:NO`，而不要`navigationBar.hidden=NO`，反之亦然。
