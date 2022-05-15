# 第一步
FROM node:12.18.2 as build-stage

# 创建工作目录
RUN mkdir /usr/app
# 从当前目录入职所有文件到docker容器
COPY . /usr/app

WORKDIR /usr/app

# 安装依赖
RUN npm install

# 添加环境变量PATH 从`/usr/src/app/node_modules/.bin` 到 $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# 安装依赖
RUN npm run build

# 第二步
# Copy the react app build above in nginx
FROM nginx:alpine

# 指定nginx工作目录
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

# 复制所有配置文件到nginx配置目录下
COPY nginx_default.conf /etc/nginx/conf.d/default.conf

RUN echo $build-stage

# 复制dist目录到nginx下的静态目录（ html ）
COPY --from=build-stage  /usr/app/dist/. /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]


