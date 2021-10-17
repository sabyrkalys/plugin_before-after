function templateSlider(width, height, state){
 return `
 <div class="slider__before" style="width:${state.width}px; height:${height}px; background-image: url(${state.before});">
   <div class="slider__risize" data-type="resize"></div>
  </div>
  <div class="slider__after" style="width:${width}px; height:${height}px; background-image: url(${state.after});"></div>
 `
}

class Slider{
 constructor(selector, width, height, state){
  this.$slider = document.getElementById(selector)
  this.sliderWidth = width
  this.sliderHeight = height
  this.state = {
   ...state,
  width:state.width || this.sliderWidth/2
 }
 this.#renderSlider(this.sliderWidth, this.sliderHeight)
  this.#render(this.sliderWidth, this.sliderHeight, this.state)
  this.#lister();
 }
 #renderSlider(width, height){
  this.$slider.style.width = `${width}px`
  this.$slider.style.height = `${height}px`
  this.$slider.style.position = 'relative'
 }
 #render(width, height, state){
  this.$slider.innerHTML = templateSlider(width, height, state)
 }
 #update(width, height, props){
   this.state = {
    ...this.state,
    ...props
   }
   this.#render(width, height, this.state)
 }
 #lister(){
  this.mouseDownHandler = this.mouseDownHandler.bind(this)
  this.mouseUpHandler = this.mouseUpHandler.bind(this)
  this.moveHandler = this.moveHandler.bind(this)
  this.$slider.addEventListener('mousedown', this.mouseDownHandler)
  this.$slider.addEventListener('mouseup', this.mouseUpHandler)
 }
 mouseDownHandler(event){
if(event.target.dataset.type === 'resize'){
 this.$slider.addEventListener('mousemove', this.moveHandler)
 this.currentClientX = event.clientX
}
 }
 mouseUpHandler(event){
this.$slider.removeEventListener('mousemove', this.moveHandler)
 }
 moveHandler(event){
  let newClientX = this.currentClientX - event.clientX
  this.#update(this.sliderWidth, this.sliderHeight, {width: this.state.width - newClientX})
  this.currentClientX = event.clientX
 }
}

const slider = new Slider(
 'slider',
 500,
 300, 
 {
before: './img/img3.jpg',
after: './img/img4.jpg'
 }
)

const slider1 = new Slider(
 'slider1',
 1024,
 512,
 {
  before: './img/img1.jpg',
after: './img/img2.jpg'
 }
)