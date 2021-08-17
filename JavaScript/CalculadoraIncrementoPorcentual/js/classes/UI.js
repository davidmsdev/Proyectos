const divResult = document.querySelector('#result');

class UI {

    insertResult(result) {

        this.clearHTML();
    
        const divResultContent = document.createElement('div');
    
        if(result > 0) {
            divResultContent.classList.add('positive');
        } else {
            divResultContent.classList.add('negative');
        }
    
        divResultContent.innerHTML = `${result}%`;
        divResult.appendChild(divResultContent);
    
        divResult.style.display = "flex";
    }
    
    clearHTML() {
    
        while(divResult.firstChild) {
            divResult.removeChild(divResult.firstChild);
        }
    }
}

export default UI;