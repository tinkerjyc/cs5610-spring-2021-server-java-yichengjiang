var $usernameFld, $passwordFld;
var $removeBtn, $editBtn, $createBtn;
var $firstNameFld, $lastNameFld, $roleFld;
var $userRowTemplate, $tbody;
var userService = new AdminUserServiceClient();

var users = [
    //{username: "ada", password: "", firstname: "Ada", lastname: "Lovelace", role: "Faculty"}
]

function renderUsers(users) {
    $tbody.empty()
    for (var i = 0; i < users.length; i++) {
        var user = users[i]
        $tbody.prepend(`
        <tr>
            <td>${user.username}</td>
            <td>&nbsp;</td>
            <td>${user.firstname}</td>
            <td>${user.lastname}</td>
            <td>${user.role}</td>
            <td class="wbdv-actions">
                <span class="pull-right">
                  <i class="fa-2x fa fa-times wbdv-remove" id=${i}></i>
                  <i class="fa-2x fa fa-pencil wbdv-edit" id=${user._id}></i>
                </span>
            </td>
        </tr>`)
    }
    $(".wbdv-remove").click(deleteUser)
    $(".wbdv-edit").click(selectUser)
}

function createUser() {
    var newUser = {
        username: $usernameFld.val(),
        password: $passwordFld.val(),
        firstname: $firstNameFld.val(),
        lastname: $lastNameFld.val(),
        role: $roleFld.val()
    }
    console.log(newUser)
    $usernameFld.val("")
    $passwordFld.val("")
    $firstNameFld.val("")
    $lastNameFld.val("")
    userService.createUser(newUser)
        .then(function (actualUser) {
            users.unshift(actualUser)
            console.log(users)
            renderUsers(users)
        })
    clearForm()
}

function deleteUser(event) {
    var button = $(event.target)
    var index = button.attr("id")
    console.log(index)
    var id = users[index]._id

    userService.deleteUser(id)
        .then(function (status) {
            users.splice(index, 1)
            renderUsers(users)
        })
}

var selectedUser = null

function selectUser(event) {
    var id = $(event.target).attr("id")
    selectedUser = users.find(user => user._id === id)
    $usernameFld.val(selectedUser.username)
    $passwordFld.val(selectedUser.password)
    $firstNameFld.val(selectedUser.firstName)
    $lastNameFld.val(selectedUser.lastName)
    $roleFld.val(selectedUser.role)
}

function updateUser() {
    selectedUser.username = $usernameFld.val()
    selectedUser.password = $passwordFld.val()
    selectedUser.firstName = $firstNameFld.val()
    selectedUser.lastName = $lastNameFld.val()
    selectedUser.role = $roleFld.val()

    userService.updateUser(selectedUser._id, selectedUser)
        .then(status => {
            var index = users.findIndex(user => user._id === selectedUser._id)
            users[index] = selectedUser
            renderUsers(users)
        })
}

function clearForm() {
    document.getElementById("usernameFld").value = ""
    document.getElementById("passwordFld").value = ""
    document.getElementById("firstNameFld").value = ""
    document.getElementById("lastNameFld").value = ""
    document.getElementById("roleFld").value = ""
}

// function findAllUsers() { … } // optional - might not need this
// function findUserById() { … } // optional - might not need this
function main() {
    $tbody = $(".wbdv-tbody")
    $createBtn = $(".wbdv-create")
    $editBtn = $(".wbdv-update")

    $usernameFld = $(".wbdv-username-fld")
    $passwordFld = $(".wbdv-password-fld")
    $firstNameFld = $(".wbdv-firstname-fld")
    $lastNameFld = $(".wbdv-lastname-fld")
    $roleFld = $(".wbdv-role-fld")

    $createBtn.click(createUser)
    $editBtn.click(updateUser)
    userService.findAllUsers()
        .then(function (actualUsers) {
            console.log(actualUsers)
            users = actualUsers
            renderUsers(users)
        })

}
$(main)

