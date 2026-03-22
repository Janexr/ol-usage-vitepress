<template>
	<div class="usage">
		<h2>style 格式说明</h2>
		<div class="desc-txt">style 既可以是一个对象、一个数组，也可以是一个函数</div>
		<ol class="desc-txt">
			<li>
				最常见的是对象 style（可滚动到本页面最下方查看脑图）。而style对象属性中最常用的是
				<span class="junior">fill、stroke、image</span>。 对象中要用什么属性则取决于要赋予样式的矢量类型。
				<ul class="desc-indent-txt">
					<li>
						如果是 <span class="important">面</span>， 则要用到 <span class="junior">fill</span> 来指定面的填充色，<span class="junior">stroke</span>
						来指定面的边框样式（颜色、宽度等）；
					</li>
					<li>如果是 <span class="important">线</span>， 则只需要 <span class="junior">stroke</span> 来指定线的样式；</li>
					<li>如果是 <span class="important">点</span>， 则只需要 <span class="junior">image</span> 属性，当然 image 对象的属性也分了两种：icon 与 circle， icon 代表点样式是用图标表示的，circle 则代表点样式是一个圆点；</li>
					<li>当然这些属性都可以同时使用，但是你要清楚到底是哪些属性分别对地图上的点、线、面起了作用</li>
				</ul>
			</li>
			<li>
				再说说 <span class="junior">text</span> 与 <span class="junior">zIndex</span>，这两个偶尔也会用到。
				<ul class="desc-indent-txt">
					<li>
						<span class="junior">text</span>
						是用来指定文本样式的。例如我们给面指定好 fill 与 stroke 之后，还想要在面上显示文字就可以用这个属性。 或者我们想在点位旁边显示文字，也可以为点位指定文本样式。
					</li>
					<li>
						<span class="junior">zIndex</span>
						是用来指定样式层级。例如同一图层的点位，想要让第一种类型的点位在第二种类型点位的上方， 就可以给第一种类型点位的样式的zIndex设置个更大的值
					</li>
					<li>
						还有
						<span class="junior">geometry</span>
						这个基本用不到的属性，想要了解更多可阅读该示例：
						<a href="https://openlayers.org/en/latest/examples/line-arrows.html" target="_blank"> https://openlayers.org/en/latest/examples/line-arrows.html </a>

						<p>下面附上 interface Style，想要了解更多，可去查看文件 @suc/gnet-monch-vue3/types/style.d.ts</p>
					</li>
				</ul>
				<codemirror :modelValue="styleInterface" v-bind="jsOp"></codemirror>
			</li>
			<li>其次是函数 style。函数 style 接收两个参数：feature 与 resolution，返回对象 style 或者 数组 style。 主要用在为 layer 设置样式上，可以根据矢量上携带的信息为每个矢量返回不同的样式</li>
			<li>
				最后是数组 style。用在为一个矢量设置多个样式，例如你可以为线设置两个 style，一个 style 的线宽些， 另一个窄一些，你就可以得到两条中心一致的线；或者你也可以一个 style 设置线的样式，另一个 style 设置 geometry，为线段两段绘制端点。 想要了解更多，可查看示例：
				<a href="https://openlayers.org/en/latest/examples/polygon-styles.html" target="_blank"> https://openlayers.org/en/latest/examples/polygon-styles.html </a>
				<div>
					<img src="@/assets/lines.png" height="341" />
					<img src="@/assets/polygon.png" />
				</div>
			</li>
		</ol>
		<img src="@/assets/style-mind-map.png" />
	</div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, toRaw } from "vue";

export default defineComponent({
	setup(props, context) {
		const { proxy } = getCurrentInstance() as any;
		const jsOp = toRaw(proxy.$myCodemirrorOptions.jsReadonly);

		const styleInterface = `interface Style {
    geometry?: string | Geometry | GeometryFunction,
    fill?: FillInterface,
    stroke?: StrokeInterface,
    image?: IconStyle | CircleStyle | RegularShapeStyle,
    text?: TextInterface,
    zIndex?: number
}`;

		return {
			jsOp,
			styleInterface,
		};
	},
});
</script>

<style lang="scss" scoped>
.usage {
	font-size: 16px;
	line-height: 30px;

	.desc-txt {
		margin: 5px 0;

		> li + li {
			margin-top: 10px;
		}
	}

	.desc-indent-txt {
		padding-left: 32px;
		list-style-type: disc;
	}

	.desc-txt code {
		padding: 0.2em 0.4em;
		margin: 0;
		background-color: #fff5f5;
		border-radius: 3px;
		color: #fa795e;
	}

	.important {
		color: red;
		font-weight: bold;
	}

	.junior {
		color: orange;
		font-weight: bold;
	}

	.map-outer {
		height: 400px;
		border: 1px solid #ccc;
	}

	div + h2 {
		margin-top: 20px;
	}
}
</style>
