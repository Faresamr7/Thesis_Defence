const deleteFieldBtns = document.querySelectorAll('.delete-field')
const popupF = document.getElementById('popup')
const errorPopupF = document.getElementsByClassName('popup-error')[0]
const cancelBtnF = document.getElementById('cancel-btn-fi')
const deleteBtnF = document.getElementById('delete-btn-fi')
if (deleteFieldBtns.length > 0) {
  deleteFieldBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      popupF.style.display = 'flex'
      deleteBtnF.setAttribute('data-id', this.getAttribute('data-field-id'))
    })
  })
}
if (deleteBtnF) {
  deleteBtnF.addEventListener('click', function () {
    let fieldId = this.getAttribute('data-id')
    console.log('**********' + fieldId)
    if (fieldId) {
      fetch(`/admin/field/${fieldId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (response.ok) {
            const deleteFieldIcon = document.getElementById(
              'delete-field-' + fieldId,
            )
            if (deleteFieldIcon) {
              const fieldRow = deleteFieldIcon.closest('tr') // Find the closest ancestor <tr> element
              if (fieldRow) {
                fieldRow.remove() // remove row
              }
            }
            popupB.style.display = 'none'
          } else {
            response.json().then((data) => {
              console.log('Error:', data.message)
              // Display error message to the user
              const errorMessageElement = document.getElementById(
                'popup-error-content',
              )
              errorMessageElement.textContent = data.message
              errorPopupF.style.display = 'flex' // Show error message
              setTimeout(() => {
                errorPopupF.style.display = 'none'
              }, 3000)
            })
          }
        })
        .catch((error) => {
          // console.error('Error:', error)
        })
    }
  })
}
if (cancelBtnF) {
  cancelBtnF.addEventListener('click', function () {
    const parentElement = cancelBtnF.parentElement
    if (parentElement) {
      const grandparentElement = parentElement.parentElement
      if (grandparentElement) {
        grandparentElement.style.display = 'none'
      }
    }
  })
}
