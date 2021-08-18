const divResult = document.querySelector('#result');
const form = document.querySelector('#calculator');

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

    imprimirAlerta(message) {

        divResult.style.display = "none";
        
        const divAlert = document.createElement('div');
        divAlert.classList.add('alert');
        divAlert.textContent = message;
        form.appendChild(divAlert);

        setTimeout(() => {
            divAlert.remove();
        }, 3000);
    }
    
    clearHTML() {
    
        while(divResult.firstChild) {
            divResult.removeChild(divResult.firstChild);
        }
    }
}

export default UI;