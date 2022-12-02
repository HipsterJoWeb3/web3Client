import ContentLoader from 'react-content-loader'

const MyLoader = (props) => (
  <ContentLoader
    speed={2}

    backgroundColor="#DFE7FB"
    foregroundColor="#CDDBFC"
    width="100%"
    height="140px"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="100%" height="140px" />
    <rect x="211" y="46" rx="0" ry="0" width="1" height="25" />
  </ContentLoader>
)

export default MyLoader
