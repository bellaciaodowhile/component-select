function selectsGj8() {
    'use strict';
    const selects = [...document.querySelectorAll('.select-gj8')];
    selects.map((select, index) => {
        let title = select.querySelector('.select-gj8__title')
        let titleCurrent = title.querySelector('.select-gj8__title__current')
        let content = select.querySelector('.select-gj8__content')
        let arrow = title.querySelector('.select-gj8__title__arrow')
        let options = [...content.querySelectorAll('.select-gj8__option')]
        title.onclick = (e) => {
            e.preventDefault();
            content.classList.toggle('select-gj8__content--active')
            arrow.classList.toggle('select-gj8__title__arrow--active')
        };
        // Reiniciar opciones activadas
        function reloadOptions() {
            options.map(x => { if (x.classList.contains('select-gj8__option--active')) x.classList.remove('select-gj8__option--active')  } )
        }
        options.map((option, iOption) => {
            option.onclick = (e) => {
                e.preventDefault();
                let name = select.classList.contains('select-gj8--edit') ? option.querySelector('.select-gj8__option__name__current').textContent.trim() : option.textContent.trim()
                /*
                    
                    En caso de querer usar solamente un select base, debes usar:

                        ------------------------------------
                        > let name = option.textContent.trim()
                        ------------------------------------

                    En caso de querer usar solamente un select edit, debes usar:

                        ----------------------------------------------------------------------------------
                        > let name = option.querySelector('.select-gj8__option__name__current').value.trim()
                        ----------------------------------------------------------------------------------

                    En caso de querer usar los dos tipos de select en el mismo documento debes usar:

                        ----------------------------------------------------------------------------------
                        > let name = select.classList.contains('select-gj8--edit') ? option.querySelector('.select-gj8__option__name__current').value.trim() : option.textContent.trim()
                        ----------------------------------------------------------------------------------

                    NOTA: esta instrucción está haciendo una comparación en el tipo de select ya que no todos tienen la misma estructura y las mismas clases

                */

                // Condicional en caso de usar el select 'edit'
                if (!content.classList.contains('select-gj8__content--editing')) {
                    titleCurrent.textContent = name
                    content.classList.remove('select-gj8__content--active')
                    arrow.classList.remove('select-gj8__title__arrow--active')
                    options.map(x => { if (x.classList.contains('select-gj8__option--active')) x.classList.remove('select-gj8__option--active')  } )
                    option.classList.add('select-gj8__option--active');
                }


                


            };
        });

        // En caso de estar usando un select de edición o ambos. Debes colocar la siguiente instrucción:
        // Inicio de la instrucción:

        // Función para verificar si ya existe un registro dentro la BBDD
        function dataRepeat(data) {
            let nameCurrents = [...select.querySelectorAll('.select-gj8__option__name__current')];
            if (nameCurrents.filter(x => x.textContent.toLowerCase().trim() == data.toLowerCase().trim()).length >= 1) {
                return true
            } else {
                return false
            }
        }

        // Función para validar campos vacíos
        function validationFields(input) {
            return input.trim() == '' ? true : false
        }

        if (select.classList.contains('select-gj8--edit')) {
            // Acción more_vert
            let triggerMoreVert = select.querySelector('.select-gj8__label__action')
            let contentEditing = select.querySelector('.select-gj8__content')
            // Función para editar
            function selectEditItem() {
                console.log('Hola vale')
                let triggersItemEdit = [...select.querySelectorAll('.select-gj8__option__trigger')]
                triggersItemEdit.map(trigger => {
                    let name = trigger.parentElement.querySelector('.select-gj8__option__name__current')
                    let input = trigger.parentElement.querySelector('.select-gj8__option__name__input')
                    let allSettings = [...document.querySelectorAll('.select-gj8__option__settings--active')]
                    let settings = trigger.parentElement.parentElement.querySelector('.select-gj8__option__settings')
                    // Acción de editar
                    let edit = settings.children[0] // edit item
                    let del = settings.children[1] // delete item
                    let saveEdit = trigger.nextElementSibling // botón submit de editar
                    let itemOption = trigger.parentElement.parentElement // opción seleccionada

                    trigger.onclick = (e) => {
                        e.preventDefault();
                        
                        settings.classList.toggle('select-gj8__option__settings--active')
                        // Quitando las otras configuraciones (settings) activas
                        allSettings.map(config => {
                            if (config.classList.contains('select-gj8__option__settings--active')) {
                                config.classList.remove('select-gj8__option__settings--active')
                            }
                        });

                        // Abriendo sección para editar
                        edit.onclick = (e) => {
                            e.preventDefault();
                            settings.classList.toggle('select-gj8__option__settings--active')
                            trigger.classList.add('select-gj8__option__trigger--hide')
                            name.classList.add('select-gj8__option__name__current--hide')
                            input.classList.add('select-gj8__option__name__input--active')
                            input.disabled = false
                            saveEdit.classList.add('select-gj8__btn--option--active')
                            // Guardando edición
                            saveEdit.onclick = (e) => {
                                // Acá todo el proceso para editar un registro
                                e.preventDefault();
                                if (validationFields(input.value)) {
                                    alert('Debe llenar este campo') 
                                } else {
                                    name.textContent = input.value
                                    input.disabled = true
                                    saveEdit.classList.remove('select-gj8__btn--option--active')
                                    trigger.classList.remove('select-gj8__option__trigger--hide')
                                    name.classList.remove('select-gj8__option__name__current--hide')
                                    input.classList.remove('select-gj8__option__name__input--active')
                                }
                            }
                        }
                        // Eliminando item
                        del.onclick = (e) => {
                            e.preventDefault();
                            if (confirm('¿Está seguro de eliminar este registro?')) {
                                // Acá todo el proceso para eliminar el item o la opción seleccionada
                                itemOption.remove()
                            }
                        }
                    }
                    
                })
            }
            selectEditItem() // Función para ejecutar las iteraciónes de los nuevos registros
            triggerMoreVert.onclick = (e) => {
                e.preventDefault();
                let optionEdit = triggerMoreVert.querySelector('.select-gj8__label__action__text')
                let iconEdit = triggerMoreVert.querySelector('.select-gj8__label__action__icon')
                let formAdd = content.querySelector('.select-gj8__content__add__form')
                let input = content.querySelector('.select-gj8__content__add__input')
                let boxOptions = content.querySelector('.select-gj8__content__options')
                if (!content.classList.contains('select-gj8__content--active')) {
                    content.classList.add('select-gj8__content--active')
                }
                if (optionEdit.textContent.toLowerCase() == 'editar') {
                    optionEdit.textContent = optionEdit.textContent.toLowerCase().replace('editar', 'Cerrar')
                    iconEdit.textContent = 'close'
                    titleCurrent.textContent = 'Modo edición'
                } else {
                    optionEdit.textContent = optionEdit.textContent.toLowerCase().replace('cerrar', 'Editar')
                    iconEdit.textContent = 'drive_file_rename_outline'
                    titleCurrent.textContent = 'Seleccione una opción:'
                }
                contentEditing.classList.toggle('select-gj8__content--editing')
                // Acción de agregar registro
                formAdd.onsubmit = (e) => {
                    e.preventDefault();
                    console.log('Registrando')

                    if (validationFields(input.value)) {
                        alert('Debe llenar el campo')
                    } else {
                        // Condicional para verificar que no hayan registro repetidos
                        if (dataRepeat(input.value)) {
                            alert('Este registro ya existe')
                        } else {
                            let newOption = document.createElement('div')
                            let item = /* html */ `
                            <form class="select-gj8__option__edit">
                                <div class="select-gj8__option__name">
                                    <i class="material-icons">drag_indicator</i>
                                    <div class="select-gj8__option__name__current"> ${ input.value.trim() } </div>
                                    <input type="text" required disabled class="select-gj8__option__name__input" value="${ input.value.trim() }">
                                </div>
                                <i class="material-icons select-gj8__option__trigger">more_vert</i>
                                <button type="submit" class="select-gj8__btn select-gj8__btn--option">
                                    <i class="material-icons-outlined">done</i>
                                </button>
                            </form>
                            <div class="select-gj8__option__settings">
                                <div class="select-gj8__option__settings__item">
                                    <i class="material-icons-outlined">drive_file_rename_outline</i>
                                </div>
                                <div class="select-gj8__option__settings__item">
                                    <i class="material-icons-outlined">delete</i>
                                </div>
                            </div>`
                            newOption.classList.add('select-gj8__option')
                            newOption.innerHTML = item
                            boxOptions.appendChild(newOption)
                            formAdd.reset()
                            selectsGj8()
                            selectEditItem()
                        }
                    }
                }
                
            }
        }   
        // Fin de la instrucción
    });
}
selectsGj8()