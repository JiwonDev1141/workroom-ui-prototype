const getUserRoleName = (index) => {
    switch (index) {
        case 1:
            return "Master"
        case 2:
            return "Super Admin"
        case 3:
            return "Admin"
        case 4:
            return "User"
        default:
            break;
    }
}

export default getUserRoleName;