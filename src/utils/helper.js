function get_Local_Name(bb, Nepal, dis) {
    if (bb === 'Municipality') {
        const res = Nepal.MunicipalitiesByDistrict(dis);
        return res;
    }
    else if (bb === 'Rular Municipality') {
        return Nepal.RularMunicipalitiesByDistrict(dis);
    }
    else if (bb === 'Metropolitan') {
        return Nepal.MetroByDistrict(dis);
    }
    else {
        return Nepal.SubMetroByDistrict(dis);
    }
}

module.exports = {
    get_Local_Name
}