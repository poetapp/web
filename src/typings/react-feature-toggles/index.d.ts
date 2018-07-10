declare module '@paralleldrive/react-feature-toggles' {
  import * as React from 'react'
  
  type Feature1 = { children?: (features: any) => React.ReactNode }
  type Feature2 = {
    inactiveComponent: () => React.ReactNode
    activeComponent: () => React.ReactNode
    name: string
  };
  function Feature({ children }: Feature1): React.ReactNode
  function Feature({ inactiveComponent, name, activeComponent }: Feature2)
  export { Feature }

  function FeatureToggles({
    features,
  }?: {
    readonly features?: ReadonlyArray<string>
    readonly children?: React.ReactNode
  }): JSX.Element
  export { FeatureToggles }

  interface Feature {
    readonly name: string
    readonly isActive: boolean
    readonly dependencies?: ReadonlyArray<string>
  }

  function getActiveFeatures(features: ReadonlyArray<Feature>): ReadonlyArray<string>
  export { getActiveFeatures }

  interface Query {
    readonly ft: string
  }
  function getQueryFeatures(query?: Query): ReadonlyArray<string>
  export { getQueryFeatures }

  function mergeFeatures(
    currentFeatures: ReadonlyArray<string>, // tslint:disable-next-line:readonly-array
    ...restOfFeatures: Array<ReadonlyArray<string>>
  ): ReadonlyArray<string>
  export { mergeFeatures }

  function removeFeatures(
    currentFeatures: ReadonlyArray<string>,
    features: ReadonlyArray<string>
  ): ReadonlyArray<string>
  export { removeFeatures }

  function isActive(name: string, currentFeatures: ReadonlyArray<string>): boolean
  export { isActive }

  interface Req {
    readonly query: Query
  }

  function getReqQueryFeatures(req?: Req): ReadonlyArray<string>
  export { getReqQueryFeatures }

  function getBrowserQueryFeatures(search?: string): ReadonlyArray<string>
  export { getBrowserQueryFeatures }

  interface CurrentActiveFeatures {
    readonly initialFeatures: ReadonlyArray<string>
    readonly req?: Req
    readonly search?: string
  }
  function getCurrentActiveFeatures(obj: CurrentActiveFeatures): ReadonlyArray<string>
  export { getCurrentActiveFeatures }
  
  type ConfigureFeature = {
    (name: string, activeComponent: React.ReactNode): () => JSX.Element;
    (name: string): (activeComponent: React.ReactNode) => () => JSX.Element;
  }
  function configureFeature(inactiveComponent: React.ReactNode): ConfigureFeature
  function configureFeature(inactiveComponent: React.ReactNode, name: string): (activeComponent: React.ReactNode) => () => JSX.Element;
  function configureFeature(inactiveComponent: React.ReactNode, name: string, activeComponent: React.ReactNode): () => JSX.Element;
  export { configureFeature }
}
