const customStyles = {
  control: (base:any, state:any) => ({
    ...base,
    '&:hover': {
      borderColor: state.isFocused && '#FFFDFA',
    },

    background: '#242424',
    borderColor: state.isFocused && '#FFFDFA',
    borderRadius: 4,
    borderWidth: state.isFocused && 2,
    color: '#FFFDFA',
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 4,
  }),
  input: (base:any) => ({
    ...base,
    color: '#FFFDFA',
    opacity: 1,
  }),
  menu: (base:any, state:any) => ({
    ...base,

    '&:hover': {
      // Overwrittes the different states of border
      background: '#242424',
    },

    backgroundColor: state.isFocused ? '#242424' : null,
    // override border radius to match the box
    borderRadius: 4,

    color: '#FFFDFA',
    marginTop: 0,
  }),
  menuList: (base:any) => ({
    ...base,

    background: '#242424',
    borderRadius: 4,
    padding: 2,
  }),
  placeholder: (base:any) => ({
    ...base,
    color: '#FFFDFA',
    opacity: 0.8,
  }),
  singleValue: (base:any) => ({
    ...base,
    color: '#FFFDFA',
    opacity: 0.6,
  }),
};
export default customStyles;
