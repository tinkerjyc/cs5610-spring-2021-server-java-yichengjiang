var $usernameFld, $passwordFld;
var $removeBtn, $editBtn, $createBtn;
var $firstNameFld, $lastNameFld, $roleFld;
var $userRowTemplate, $tbody;
var userService = new AdminUserServiceClient();

var users = [
    //{username: "ada", password: "", firstname: "Ada", lastname: "Lovelace", role: "Faculty"}
]

function createUser() {
    var newUser = {
        username: $usernameFld.val(),
        password: $passwordFld.val(),
        firstname: $firstNameFld.val(),
        lastname: $lastNameFld.val(),
        role: $roleFld.val()
    }
    $usernameFld.val("")
    $passwordFld.val("")
    $firstNameFld.val("")
    $lastNameFld.val("")
    userService.createUser(newUser)
        .then(function (actualUser) {
            users.push(actualUser)
            renderUsers(users)
        })
}

function deleteUser(event) {
    var button = $(event.target)
    var index = button.attr("id")
    var id = users[index]._id

    userService.deleteUser(id)
        .then(function (status){
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

function renderUsers(users) {
    $tbody.empty()
    for (var i = 0; i < users.length; i++) {
        var user = users[i]
        $tbody.append(`
            <tr class="wbdv-template wbdv-user wbdv-hidden">
            <td class="wbdv-username">${user.username}</td>
            <td>&nbsp;</td>
            <td class="wbdv-first-name">${user.firstName}</td>
            <td class="wbdv-last-name">${user.lastName}</td>
            <td class="wbdv-role">${user.role}</td>
            <td class="wbdv-actions">
        <span class="float-right">
          <i id="${i}" class="fa-2x fa fa-times wbdv-remove"></i>
          <i id="${user._id}" class="fa-2x fa fa-pencil wbdv-edit"></i>
        </span>
            </td>
        </tr>
        `)
    }
    $removeBtn = $(".wbdv-remove")
    $removeBtn.click(deleteUser)

    $editBtn = $(".wbdv-edit")
    $editBtn.click(selectUser)
}

// function findAllUsers() { … } // optional - might not need this
// function findUserById() { … } // optional - might not need this
function main() {
    $tbody = jQuery(".wbdv-tbody")
    $createBtn = $(".wbdv-create")
    $editBtn = $(".wbdv-update")

    $usernameFld = $("#usernameFld")
    $passwordFld = $("#passwordFld")
    $firstNameFld = $("#firstNameFld")
    $lastNameFld = $("#lastNameFld")
    $roleFld = $("#roleFld")

    $createBtn.click(createUser)
    $editBtn.click(updateUser)
    userService.findAllUsers()
        .then(function(actualUsersFromServer){
            users = actualUsersFromServer
            renderUsers(users)
        })

}

$(main)

