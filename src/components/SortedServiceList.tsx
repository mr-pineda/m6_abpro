import { Component } from 'react';
import ServiceList from './ServiceList';

interface ServiceListProps {
  services: string[];
}

// HOC que muestra la lista de servicios ordenada alfabéticamente reutilizando el componente ServiceList
class SortedServiceList extends Component<ServiceListProps> {
  render() {
    const { services } = this.props;
    const data = services.sort();
    return <ServiceList services={data} />;
  }
}

export default SortedServiceList;
