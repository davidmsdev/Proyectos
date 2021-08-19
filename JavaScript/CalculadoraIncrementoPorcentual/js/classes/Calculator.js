import UI from './UI.js'

class Calculator {

    calculateDifference(e) {
        e.preventDefault();
        
        const ui = new UI();
    
        const initialValue = document.querySelector('#initial').value;
        const finalValue = document.querySelector('#final').value;

        // Validar
        if(initialValue === '' || finalValue === '') {
            ui.showAlert('Ambos campos son obligatorios');
            return;
        }
    
        const result = ((finalValue - initialValue)/initialValue) * 100;
        ui.insertResult(result);
    }
}

export default Calculator;