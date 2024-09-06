

def determine_reading_order(dm_list_without_defect, defect_dm_list):
    return not any(
        defect_dm_list[i] == dm_list_without_defect[len(dm_list_without_defect) - i - 1] and
        defect_dm_list[i] != '0' and
        dm_list_without_defect[len(dm_list_without_defect) - i - 1] != '0'
        for i in range(len(dm_list_without_defect)) if defect_dm_list
    )
