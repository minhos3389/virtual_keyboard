const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
  entry: "./src/js/index.js", // 진입점
  output: {
    filename: "bundle.js", // 번들될 파일 이름
    path: path.resolve(__dirname, "./dist"), // 번들파일 생성될 경로 (path 모듈 사용해야 상대경로 입력해도 절대경로를 찾을 수 있음)
    clean: true, // 이미 다른 파일이 있는 경우 지우고 새로 생성
  },
  devtool: "source-map", // 빌드한 파일과 원본파일 서로 연결시키는 기능.
  mode: "development", //  난독화 기능을 제공하는지
  // 추가적인 압축플러그인 사용 (기본제공하는 압축 기능도 있긴있음.)
  devServer: {
    host: "localhost",
    port: 8080,
    open: true, // 웹팩데브서버가 실행될때마다 새창을 열으라는 의미.
    watchFiles: "index.html", // index.html에 변화가 있을때 마다 변화를 감지해서 리로드.
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "keyboard",
      template: "./index.html",
      inject: "body", // 이 설정해주지 않으면 head쪽에 javascript 코드 주입됨.
      favicon: "./favicon.ico",
    }),
    new MiniCssExtractPlugin({
      filename: "style.css",
    }),
  ],
  module: {
    rules: [
      {
        // 웹팩컴파일러에게, dependency graph를 그리다가 'test'에 지정된 파일 형식을 발견하면 번들에 넣기전에 use에 지정한 로더로 변환시켜달라고 함.
        // 이렇게 Loader를 설정해주면 포맷에 얽매이지 않고 자유로운 import 가능.
        // js파일에서 import "../css/style.css" 와 같이 해당모듈에서 필요한 css파일 import 가능.
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  optimization: {
    // minimizer 에 array 넣어줌.
    minimizer: [new TerserWebpackPlugin(), new CssMinimizerPlugin()],
  },
};
