export function listSelector(state, ownProps) {
    const { itemsPerPage, activeType, lists } = state.list;
    const ids = lists[activeType];
    return{
        activeType,
        ids
    }
}
