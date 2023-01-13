export const Tabs = () => {
     const tabs = document.querySelectorAll('.tab-item');
     const tabSelected = document.querySelector('.tab-item.selected');
     const line = document.querySelector('.navbar .line');
     line.style.left = tabSelected.offsetLeft + "px";
     line.style.width = tabSelected.offsetWidth + "px";
     tabs.forEach((tab, index) => {
         tab.onclick = function() {
             document.querySelector('.tab-item.selected').classList.remove('selected')
             line.style.left = this.offsetLeft + "px";
             line.style.width = this.offsetWidth + "px";
             this.classList.add('selected')
         }
     })
}


