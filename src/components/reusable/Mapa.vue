<template>
	<div class="Mapa">
		<div id="map"></div>
		<ul class="legenda">
			<template v-for="layer in mapa_attrs.layers">
				<li>
					<div :style="{
						backgroundColor:layer.fill_color, 
						borderColor: layer.stroke_color,
						borderWidth: layer.stroke_width + 'px',
				}"></div> 
				<a
					:href="layer.path"
					:download="layer.title + '.kml'"
				>{{ layer.title }}</a></li>
			</template>
		</ul>
	</div>
</template>

<script>
export default{
	name:'Mapa',
	data(){
		return {
		}
	},
	computed:{
		mapLayers(){
			let output_layers = [
				new ol.layer.Tile({
					source: new ol.source.BingMaps({
						imagerySet: 'AerialWithLabels', 
						culture: 'pt-BR',
						key: 'efIeX8pQ5PTC2IcEjuVT~s7zLBU5z6I20qWhPhkAy3w~AlgB9eABTaOsOC8LVDJEQhyb4ik0B0mWBpIfDgrVwNYVqgfnxOsXFN3_8XKZlP1d'
					})
				})
			]
			this.mapa_attrs.layers.map(function(index) {
				let kml_layer = new ol.layer.Vector({
					style: new ol.style.Style({
						stroke: new ol.style.Stroke({
							color: index.stroke_color,
							width: index.stroke_width
						}),
						fill: new ol.style.Fill({
							color: index.fill_color,
						})
					}),
					source: new ol.source.Vector({
						url: index.path,
						format: new ol.format.KML({
							extractStyles: false,
						})
					})
				})
				output_layers.push(kml_layer)
			})
			return output_layers
		},
		mapView(){
			return new ol.View({
				center: this.mapa_attrs.center,
				zoom: this.mapa_attrs.zoom
			})
		}
	},
	props:[ 'mapa_attrs' ], 
	mounted(){
		let app = this
		this.createMap()
		this.mapView.setMinZoom(this.mapa_attrs.zoom)
	},
	methods:{
		createMap(){
			new ol.Map({
				layers: this.mapLayers,
				target: 'map',
				view: this.mapView,
				controls: ol.control.defaults({
					attributionOptions: {
						collapsible: true
					}
					}).extend([
						new ol.control.ScaleLine()
					])
			})
		},
	}
}	
</script>
<style lang="scss" scoped>
@import "../../assets/variables.scss";

#map, ul.legenda{
	width: 80vw;
	margin: auto
}

ul.legenda{
	padding: .5rem 0;
	li{
		display: inline-flex;
		font-size: .85em;
		div{
			border-style: solid;
			height: 20px;
			width: 20px;
			margin-right: .35rem;
		}
		a{
			color: $primary-grey;
			margin-right: 0.70rem
		}
		a:hover {
			color: rgba(0,0,0,.2);
		};
	}
}

</style>