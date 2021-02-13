import React, { Fragment, Component, useEffect } from 'react';
import anime, { AnimeParams } from 'animejs';

interface AllProps extends AnimeParams {
  children: React.ReactNode;
  svg?: boolean;
}

export const Anime = (props: AllProps) => {
  let targets = [];
  let targetRefs = [];
  let _anime = null;

  // UseEffect to component mount run createAnime() function.

  useEffect(() => {
    createAnime();
  }, []);

  const createAnime = () => {
    if (targets.length > 0 && anime !== undefined) {
      _anime.remove(targets);
    }

    // Attach the targetRefs to targets.
    targets = [];
    for (let ref of targetRefs) {
      if (ref.current) {
        targets.push(ref.current);
      }
    }

    // Mutable pattern, replace this with const.
    let animeProps = { ...props, targets: targets };

    // Delete the property of children from the anime props.
    delete animeProps.children;
    // Delete the property of children from the svg.
    delete animeProps.svg;

    // Create an instance of anime with the anime() constructor and store it to anime, little confusing.
    _anime = anime(animeProps);
  };

  // Render children, and their diffs until promise of anime finishes.
  const children = Array.isArray(props.children)
    ? props.children
    : [props.children];
  const refs = targetRefs;

  return (
    <Fragment>
      {children.map((child, i) => {
        refs.push(React.createRef());
        const El = props.svg ? 'g' : 'div';
        return (
          <El ref={refs[refs.length - 1]} key={`${'__anime__'}${i}`}>
            {child}
          </El>
        );
      })}
    </Fragment>
  );
};

export default Anime;
export { anime };
