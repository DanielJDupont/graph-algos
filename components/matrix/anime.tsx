import React, { Fragment, Component } from 'react';
import { AnimeProps } from './index.dataTypes';
import anime from 'animejs';

if (typeof window !== 'undefined') {
  const animejs = require('animejs');
}

const PREFIX = '__anime__';

export class Anime extends Component {
  props: AnimeProps;

  targets: any[];
  targetRefs: any[];
  anime: any;

  constructor(props: AnimeProps) {
    super(props);

    // Current Anime DOM Targets
    this.targets = [];
    this.targetRefs = [];
    this.anime = null;
  }

  componentDidMount() {
    this.createAnime();
  }

  componentDidUpdate() {
    this.createAnime();
  }

  createAnime = () => {
    let props = this.props;
    if (this.targets.length > 0 && this.anime !== undefined) {
      anime.remove(this.targets);
    }

    this.targets = [];
    for (let ref of this.targetRefs) {
      if (ref.current) {
        this.targets.push(ref.current);
      }
    }

    let animeProps = { ...props, targets: this.targets };
    delete animeProps.children;
    delete animeProps.svg;
    this.anime = anime(animeProps);
  };

  // Render children, and their diffs until promise of anime finishes.
  render() {
    const children = Array.isArray(this.props.children)
      ? this.props.children
      : [this.props.children];
    const refs = this.targetRefs;

    return (
      <Fragment>
        {children.map((child, i) => {
          refs.push(React.createRef());
          const El = this.props.svg ? 'g' : 'div';
          return (
            <El ref={refs[refs.length - 1]} key={`${PREFIX}${i}`}>
              {child}
            </El>
          );
        })}
      </Fragment>
    );
  }
}

export default Anime;
export { anime };
