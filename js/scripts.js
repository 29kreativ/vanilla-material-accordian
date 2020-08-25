document.addEventListener('DOMContentLoaded', function() {

    initAccordion();

    document.querySelector('.add-accordion').addEventListener('click', function(e){
        e.preventDefault();

        newnode = document.querySelector('.accordion-template').childNodes[1].cloneNode(true);
        
        this.parentNode.insertBefore(newnode,this);

        $this = this;
        setTimeout(function(){
            initAccordion();
            adjustAccordianHeight($this);
        },50);
        
    })

})

initAccordion = function(){
    //accordian
    var acc = document.getElementsByClassName("cjf40-accordian-button");
    var i;
    var scrollTop;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", initAccordionButton);
    }
}

initAccordionButton = function() {
    var acc_group = this.parentNode.getAttribute('data-accordian-group');
    var actives = document.querySelectorAll('.cjf40-accordian[data-accordian-group="'+acc_group+'"].active');

    $this = this;
    scrollTop = $this.parentNode.offsetTop;

    if(actives.length == 0){
        this.parentNode.classList.add("active");
        var panel = this.nextElementSibling;
        panel.style.maxHeight = panel.scrollHeight + "px";
        this.querySelector('.material-icons').innerHTML = 'remove_circle_outline';
        
        //document.querySelector('.cjf40-accordians-container').scrollTop = this.parentNode.offsetTop;
        setTimeout(function(){
            document.querySelector('.cjf40-accordians-container').scrollTop = $this.parentNode.offsetTop;
            adjustAccordianHeight($this.parentNode.parentNode);
        },300);


    }
    else{

        if(this.parentNode == actives[0]){
            this.parentNode.classList.remove("active");
            var panel = this.nextElementSibling;
            panel.style.maxHeight = null
            this.querySelector('.material-icons').innerHTML = 'add_circle_outline';
        }
        else{
            panel = actives[0].querySelector('.cjf40-accordian-panel');
            panel.style.maxHeight = null;
            actives[0].querySelector('.cjf40-accordian-button').querySelector('.material-icons').innerHTML = 'add_circle_outline';
            actives[0].classList.remove('active');
            
            this.parentNode.classList.add("active");
            var panel = this.nextElementSibling;
            panel.style.maxHeight = panel.scrollHeight + "px";
            this.querySelector('.material-icons').innerHTML = 'remove_circle_outline';

            //document.querySelector('.cjf40-accordians-container').scrollTop = this.parentNode.offsetTop;

            setTimeout(function(){
                document.querySelector('.cjf40-accordians-container').scrollTop = $this.parentNode.offsetTop;
                //console.log($this.parentNode.offsetTop);
            },500);

        }

    }

}


adjustAccordianHeight = function(startingElement){

    //console.log('starting element', startingElement);
    parentEAccor = startingElement.closest('.cjf40-accordian');
    //console.log('parent',parentEAccor);
    if(parentEAccor == null) return;

    panel = parentEAccor.querySelector('.cjf40-accordian-panel');
    panel.style.maxHeight = panel.scrollHeight + "px";

    setTimeout(function(){
        
        adjustAccordianHeight(parentEAccor.parentNode);
    },300);

}   