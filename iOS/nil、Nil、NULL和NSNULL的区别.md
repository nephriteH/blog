- `nil`是一个空对象，当我们将一个对象置为nil时，系统会回收该对象的内存，置为nil后，可以做向该对象发送消息等操作，不会报错，但是不能进行  `retain`，`copy`等跟引用计数相关的操作，例如：添加到数组、字典中。
- `Nil`等同于`nil`，但是为了编程习惯，代码的可读性，我们将`nil`用于对象置空，而将`Nil`用于类置空。
- `NULL`是C语言中沿用过来的，表示空指针，用于基本数据类型置空。例如：int,char等
- `NSNull`是一个对象，它的值是空，只有一个类方法，`[NSNull null]`;`NSNull`和`nil`的区别是：`nil`是一个空对象，它已经在内存中不存在了，被销毁回收了，而`NSNull`是“有一个对象，这个对象什么也没有”，它在内存中是存在的，是有内存地址的。在源码中可以看出，`NSNull`是`NSObject`的子类，并且遵循了`<NSCopying, NSSecureCoding>`这两个协议。

-----

总结：
1. 对象置空，`nil`;
2. 类置空，`Nil`;
3. 基本数据类型置空，`NULL`;
4. 需要一个占位时；比如在数组中，字典中，需要某个字段为空值时，`NSNull`;
5. 注意，`nil`是不能添加到数组、字典中的;

2021-12-28 14:50:00 星期二