// swiper.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    "swiper-container": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      init?: string;
      ref?: React.Ref<any>;
    };
    "swiper-slide": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;
  }
}
