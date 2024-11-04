# Vite+Vue3+ts多页面项目构建

## 背景
&emsp;&emsp;公司前端项目，是由Vite+Vue3+ts搭建的单页面项目，但是随着需求增多，发现越来越多的页面互相之前没有关联关系，耦合度极低，项目逐渐变大后会导致每个独立页面的启动速度慢，打包时间长，而且每次发布打包都会影响线上所有页面（虽然可能代码没改动，但是引用的三方npm包、公共组件等可能会变化），这些都有可能导致线上其他页面被修改，测试力度不够的话都可能会导致各类的隐藏bug。

&emsp;&emsp;由此产生了搭建多页面项目的想法。

## 技术栈

[vite](https://cn.vite.dev/guide/)+[vue3](https://vuejs.org/)+[ts](https://www.tslang.cn/)+[eslint](https://eslint.org/)+[prettier](https://prettier.io/)

## 需求

  1. 脚本自动创建新页面，包括app.vue、index.html、main.ts、views文件夹；
  2. 单独调试(dev)和打包(build)某个页面；
  3. 同时调试(dev)和打包(build)所有页面；

## 开始！

### 一、目录结构

```
├── README.md 
├── dist               //打包输出目录
├── node_modules       //三方
├── public             //公共静态资源
├── scripts            //脚本（打包、创建新页面）
│   ├── template       //创建子页面的模版
│   ├── newPage.mjs      //创建子页面的脚本
│   └── build.cjs      //打包所有页面的脚本
├── src 
│   ├── arrets         //公共静态资源
│   ├── components     //公共组件
│   ├── imgs           //图片
│   ├── utils          //公共方法
│   ├── services       //公共请求
│   └── pages          //多页面文件夹
├──  pages.json        //子页面描述说明集合文件
├── .env.development   //开发-环境变量
├── .env.prerelease    //预发-环境变量
├── .env.test          //测试-环境变量
├── .env.production    //生产-环境变量
├── .eslintrc.cjs      //eslint 配置
├── .gitignore         //git 提交忽略文件
├── .prettierignore    //prettier 忽略文件
├── .prettierrc.json     //prettier 配置
├── tsconfig.json      //ts 配置
├── vite.config.ts     //vite 配置
├── package.json
├── package-lock.json
```

### 二、新建项目
> vite创建vue项目，创建一个基础模板就行，选择ts，其他router，store，sass等等随意，不做赘述。

> npm 安装 prettier、eslint、chalk(可以给打印台的文字加颜色)
> **不安装的话其中有些脚本可能会报错。**
> **这几个包涉及到的逻辑不影响功能，如果看得懂的话可以将对应的脚本修改、优化或删除，主要就是格式化文本，打印台输出文字变色提醒等**


##### 配置vite.config.ts
> 路径别名、配置静态资源目录、配置代理解决测试地址跨域问题等等
>
> 详细介绍不再这里赘述，自行查阅。
```js
// vite.config.ts
...
resolve: {
    alias: {
      '@': path.join(__dirname, './src'),
      '@pages': path.join(__dirname, './src/pages')
    }
}
...
base: './'  // 静态资源基础路径
...
server: {
    host: 'localhost', // 指定主机名
    port: 8080, // 指定端口
    hmr: true,  // 开启热更新
    open: true, // 在服务器启动时自动在浏览器中打开应用程序
    proxy: { // 代理解决跨域问题
      '/request': {
        target: 'http://localhost:8081/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/request/, '')
      }
    }
}
...
```

##### 配置tsconfig.json
> 配置可以酌情使用，其中重要的是include，需要包含scripts下的文件，否则会有些报错。
```json
  // tsconfig.json
  {
    "extends": "@vue/tsconfig/tsconfig.dom.json",
    "compilerOptions": {
      "composite": true,
      // "target": "esnext", //用于指定 TS 最后编译出来的 ES 版本
      "types": ["vite/client", "node"], //要包含的类型声明文件名列表
      "useDefineForClassFields": true, //将 class 声明中的字段语义从 [[Set]] 变更到 [[Define]]
      "module": "esnext", // 设置编译后代码使用的模块化系统：commonjs | UMD | AMD | ES2020 | ESNext | System
      "moduleResolution": "node", // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
      "strict": true, //开启所有的严格检查
      "jsx": "preserve", //在 `.tsx`文件里支持JSX： `"React"`或 `"Preserve"`
      "sourceMap": false, // 生成目标文件的sourceMap文件
      "resolveJsonModule": true, //允许导入扩展名为“.json”的模块
      "isolatedModules": true, //确保每个文件都可以在不依赖其他导入的情况下安全地进行传输
      "esModuleInterop": true, //支持导入 CommonJs 模块
      "lib": ["esnext", "dom", "ES2015"], //TS需要引用的库，即声明文件，es5 默认引用dom、es5、scripthost,如需要使用es的高级版本特性，通常都需要配置，如es8的数组新特性需要引入"ES2019.Array",
      // "noLib": false, //不包含默认的库文件（ lib.d.ts）
      "skipLibCheck": true, //忽略所有的声明文件（ *.d.ts）的类型检查
      "allowJs": true, // 允许编译器编译JS，JSX文件
      "noEmit": true, // 不输出文件,即编译后不会生成任何js文件
      "allowImportingTsExtensions": true,
      "allowSyntheticDefaultImports": true, //允许从没有设置默认导出的模块中默认导入。这并不影响代码的输出，仅为了类型检查。默认值：module === "system" 或设置了 --esModuleInterop 且 module 不为 es2015 / esnext
      "baseUrl": "./", //// 解析非相对模块的基地址，默认是当前目录
      "paths": {
        "@/*": ["src/*"], //解决引入报错  找不到模块“@/xxxx” 或其相应的类型声明
        "@pages/*": ["src/pages/*"]
      }
    },
    "include": [
      "src/**/*.ts",
      "src/**/*.js",
      "src/**/*.d.ts",
      "src/**/*.tsx",
      "src/**/*.vue",
      "src/**/*.json",
      "src/env.d.ts",
      "src/global.d.ts",
      "scripts/**/*.ts",
      "scripts/**/*.vue"
    ],
    "exclude": ["vite.config.ts", "src/**/__tests__/*"]
  }
```

### 三、实现需求1，脚本创建新页面

脚本使用的是node.js，主要使用的是[fs模块](https://nodejs.cn/api/fs.html)，操作文件夹及文件。其中各种方法的含义自行查询

#### 1. 将scripts文件夹复制到自己的项目中 [git地址]()
#### 2. package.json中添加命令
   ```json
    // package.json
    "scripts": {
        ...
        "new-page": "node ./scripts/newPage.mjs"
    }
   ```
#### 3. 执行npm run new-page; 
  > &emsp;&emsp;提示"请输入要生成的页面"，输入规则是 a:b，a表示页面目录，b表示页面描述。输入后回车，会在src/pages/下创建名为a的文件夹，并将/scripts/template/下的所有文件全部复制到a文件夹下。
  >
  > &emsp;&emsp;可以在template里添加自己项目的模板文件，比如router，store等等看自己项目的需求
#### 4. newPage.mjs文件介绍
    
  ##### 4.1 使用process.stdin获取在控制台中的输入的内容，即a:b；然后使用fs.mkdirSync创建文件夹，{recursive: true}表示允许创建多级目录，例如：a/aa/aaa:b；

    ```mjs
      // newPage.mjs  
      process.stdin.on('data', async (chunk) => {
        // 获取输入的信息
        const content = String(chunk).trim().toString();
        const inputSearch = content.search(':');
        if (inputSearch == -1) {
          errorLog('格式错误，请重新输入');
          return;
        }
        // 拆分用户输入的名称和描述
        inputName = content.split(':')[0];
        inputDesc = content.split(':')[1] || inputName;
        log(`将在 /src/pages 目录下创建 ${inputName} 文件夹，并复制模板`);
        const targetPath = resolve('./src/pages', inputName);
        // 判断同名文件夹是否存在
        const pageExists = fs.existsSync(targetPath);
        if (pageExists) {
          errorLog('页面已经存在，请重新输入');
          return;
        }
        // 创建目录并复制文件
        fs.mkdirSync(targetPath, { recursive: true });
        successLog(`创建完成`);
        ...
        ...
      })
    ```
  ##### 4.2 创建文件成功后，用fs.copyFileSync，递归复制各级文件
  ```mjs
    // newPage.mjs
    ...
    ...
      const sourcePath = resolve('./scripts/template');
      copyFile(sourcePath, targetPath);
      successLog(`模板复制完成`);
    ...
    ...
    const copyFile = (sourcePath, targetPath) => {
      const sourceFile = fs.readdirSync(sourcePath, { withFileTypes: true });

      sourceFile.forEach((file) => {
        const newSourcePath = path.resolve(sourcePath, file.name);
        const newTargetPath = path.resolve(targetPath, file.name);
        //isDirectory() 判断这个文件是否是文件夹，是就继续递归复制其内容
        if (file.isDirectory()) {
          isExist(newTargetPath);
          copyFile(newSourcePath, newTargetPath);
        } else {
          fs.copyFileSync(newSourcePath, newTargetPath);
        }
      });
    };
  ```
  ##### 4.3 将文件复制完成后，重写两个文件，pages.json、index.html。
  > &emsp;&emsp;pages.json是用于记录当前已创建的所有文件名称和描述，一是为了构建所有页面时使用，二是为了去重，防止新旧页面名称一样导致原页面被重置。

  > &emsp;&emsp;index.html是项目启动的根页面，包含本项目中所有的页面列表，方便快速打开想要调试的页面
  ```mjs
    // newPage.mjs 
    /**
    * 重写pages.json
    */
    async function setPagesFile(jsonData) {
      // 通过writeFile改变数据内容
      log(`正在重写pages.json文件`);
      prettier.resolveConfig(resolve('./', '.prettierrc.json'));
      const formatted = await prettier.format(JSON.stringify(jsonData), { parser: 'json' });
      fs.writeFile(path.resolve('./', 'pages.json'), formatted, 'utf-8', (err) => {
        if (err) throw err;
        successLog(`重写完成`);
        setHtmlFile();
      });
    }

    /**
    * 重写根目录下的index.html，方便本地调试
    */
    async function setHtmlFile(pageObj) {
      log(`正在重写根目录下的index.html文件`, pageObj);
      // 先获取html文件原内容
      await fs.readFile(path.resolve('./', 'index.html'), 'utf-8', async (err, data) => {
        if (err) throw err;
        // 找到"<body>"位置，向其后插入用于跳转的标签
        const bodyTagIndex = data.indexOf('<body>');
        if (bodyTagIndex === -1) {
          console.error('<body> 标签未找到');
          return;
        }
        // 在 <body> 后插入 <p> 标签
        const insertIndex = bodyTagIndex + '<body>'.length;
        const newContent = `${data.slice(0, insertIndex)}<p><a href="./src/pages/${inputName}/index.html">${inputDesc}</a></p>${data.slice(insertIndex)}`;
        // 将新得到的字符串格式化
        prettier.resolveConfig(resolve('./', '.prettierrc.json'));
        const formatted = await prettier.format(newContent, { parser: 'html' });
        fs.writeFile(path.resolve('./', 'index.html'), formatted, 'utf-8', (err) => {
          if (err) throw err;
          successLog(`重写完成`);
          process.stdin.emit('end');
        });
      });
    }
  ```
### 四、实现需求2，单独调试(dev)和打包(build)某个页面
**命令**
```
npm run dev --page=a;
npm run build --page=a;
```
#### 介绍 (主要修改vite.config.ts文件中的配置)
#### 1. getBuildEnterPages()

> 根据命令中--page的值 动态配置build时的页面入口，返回给 build.rollupOptions.input
> 
```js
  // vite.config.ts

  /**
  * 获取build时的页面入口
  * 该方法只支持单页面的打包，不能支持全量打包，全量打包需要执行build.mjs脚本
  */
  const getBuildEnterPages = () => {
    if (!npm_config_page && npm_lifecycle_event !== 'dev') {
      errorLog('请在命令行后以 `--page=页面目录` 格式指定页面目录！');
      process.exit();
    }
    if (npm_lifecycle_event === 'build') {
      infoLog('正在打包');
    }
    // 打包指定页面，遍历pages.json，判断页面是否存在
    const filterArr = pages.filter(
      (item) => item.chunk.toLowerCase() == npm_config_page.toLowerCase()
    );
    if (!filterArr.length && npm_lifecycle_event !== 'dev') {
      errorLog('不存在此页面，请检查页面目录！');
      process.exit();
    }
    return {
      [npm_config_page]: resolve(__dirname, `src/pages/${npm_config_page}/index.html`)
    };
  };
  // defineConfig
  export default defineConfig({
    ...
    build: {
      rollupOptions: {
        input: getBuildEnterPages()// 指定打包页面入口
      }
    }
    ...
  });
```

#### 2. getEnterRoot()
> 动态修改root目录
```js
  // vite.config.ts

  /**
  * 动态修改项目根目录入口
  * 1. 为了build后的文件结构。不然index.html的目录结构太深了/dist/src/pages/a/index.html
  * 2. 修改root目录可以实现dev单页面还是dev全部页面
  */
  const getEnterRoot = () => {
    // 如果是dev，且没有指定--page则直接启动所有页面
    if (!npm_config_page && npm_lifecycle_event === 'dev') {
      return resolve(__dirname);
    }
    // 遍历pages.json，判断页面是否存在
    const filterArr = pages.filter(
      (item) => item.chunk.toLowerCase() == npm_config_page.toLowerCase()
    );
    if (!filterArr.length) {
      errorLog('不存在此页面，请检查页面目录！');
      errorLog('命令以 `--page=页面目录` 格式指定页面目录!');
      errorLog('若要打包全部页面则需要执行`npm run build-all`');
      process.exit();
    }
    return resolve(__dirname, `src/pages/${npm_config_page}`);
  };
  // defineConfig
  export default defineConfig({
    ...
    root: getEnterRoot(),
    ...
  });
```
#### 3. 修改打包后的输出路径
```js
  // vite.config.ts
  // defineConfig
  export default defineConfig({
    ...
    build: {
      outDir: resolve(__dirname, `dist/${npm_config_page}`), // 指定打包后的文件输出路径 npm_config_page即 --page的值
    }
    ...
  });

```
#### 4. 修改环境变量路径 envDir
```js
  // vite.config.ts
  // defineConfig
  export default defineConfig({
    ...
    envDir: resolve(__dirname), // 由于修改了root地址，所以需要重新指回环境变量的路径为根目录
    ...
  });
```

#### 五、实现需求3，同时调试(dev)和打包(build)所有页面
```
npm run dev;
npm run build-all;
```

#### 1. npm run dev

> dev所有页面就是root配置成项目根目录即可，其实第四步里已经实现了`npm run dev`启动所有页面了。
> 
> 如果想严谨一点，比如必须`npm run dev-all`，可以改造一下`getEnterRoot()`方法。将`npm_lifecycle_event === 'dev'`改为`npm_lifecycle_event === 'dev-all'`
>
> 并在package.json中添加命令 `"dev-all": "vite"`

```json
  // package.json
  "scripts": {
    ...
    "dev-all": "vite"
    ...
  }
```
```js
const getEnterRoot = () => {
  // 如果是dev-all，则返回整个项目的根目录
  if (!npm_config_page && npm_lifecycle_event === 'dev-all') {
    return resolve(__dirname);
  }
  // 遍历pages.json，判断页面是否存在
  const filterArr = pages.filter(
    (item) => item.chunk.toLowerCase() == npm_config_page.toLowerCase()
  );
  if (!filterArr.length) {
    errorLog('不存在此页面，请检查页面目录！');
    errorLog('命令以 `--page=页面目录` 格式指定页面目录!');
    errorLog('若要打包全部页面则需要执行`npm run build-all`');
    process.exit();
  }
  return resolve(__dirname, `src/pages/${npm_config_page}`);
};
```
#### 2. npm run build-all
> 在package.json中添加命令`"build-all": "node ./scripts/build.cjs"`，其实就是node执行scripts文件夹中的build.mjs脚本
>
> 脚本逻辑很简单，就是获取pages.json中的所有页面信息，然后根据记录的信息生成`npm run build --page=`，for循环执行所有命令，打包构建所有页面。
>
> 待优化的点：配置环境。如：`npm run build-all test`，`npm run build-all development`，`npm run build-all prerelease`。
```json
  // package.json
  "scripts": {
    ...
    "build-all": "node ./scripts/build.cjs",
    ...
  }
```
```cjs
// build.cjs
  const { exec } = require('child_process');
  const pagesArray = require('../pages.json');

  // 获取命令行参数
  const args = process.argv;
  // 配置环境 比如npm run build-all:test npm run build-all:development  暂时没启用，待优化
  const commandLineArgs = args.slice(2);

  for (let i = 0; i < pagesArray.length; i++) {
    const page = pagesArray[i];
    // 定义要执行的命令
    const commandToExecute = `npm run build${commandLineArgs[0] === 'test' ? ':test' : ''} --page=${page.chunk}`;
    exec(
      commandToExecute,

      (error, stdout, stderr) => {
        if (error) {
          console.error(`打包出错: ${error.message}`);
          return;
        }

        console.log(`打包成功(${commandToExecute}):\n${stdout}`);
      }
    );
  }

```

#### 其他

打包后会生成 `tsconfig.tsbuildinfo`  `vite.config.ts.timestamp-1730464365481-a0d864a250d37.mjs`文件，这两个文件都可以随时删除，且记录在.gitignore忽略文件中

> `tsconfig.tsbuildinfo` 用于记录构建的文件信息，以便下次构建是跳过未发生变化的文件，提高构建速度

> `vite.config.ts.timestamp-1730464365481-a0d864a250d37.mjs` 当build构建失败报错时会生成该文件，用于记录构建信息的，方便定位失败原因


#### 参考文档
&emsp;&emsp; [https://juejin.cn/post/7223286759630127159#heading-23](https://juejin.cn/post/7223286759630127159#heading-23);

&emsp;&emsp; 这篇文章写的很详细，但是吐槽一下：内容太多了，除了多页面项目的搭建，还加了一些其他方面的东西，有点冗余。其实可以分多篇文章介绍的。























