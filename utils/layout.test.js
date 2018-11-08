import React from 'react';
import renderer from 'react-test-renderer';
import { 
  PressBtn, InvertBtn, SuccessBtn, DangerBtn, LinkBtn,
  CustomTextField, CustomSwitch,
  Title, SubTitle, StepProgress, CustomText, ScreenTitle,
} from './layout';

describe('Layout Buttons', () => {
  describe('<PressBtn />', () => {
    it('render without crashing', async () => {
      const component = renderer.create(
          <PressBtn />
      )
      let tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('<InvertBtn />', () => {
    it('render without crashing', async () => {
      const component = renderer.create(
          <InvertBtn />
      )
      let tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('<SuccessBtn />', () => {
    it('render without crashing', async () => {
      const component = renderer.create(
          <SuccessBtn />
      )
      let tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('<DangerBtn />', () => {
    it('render without crashing', async () => {
      const component = renderer.create(
          <DangerBtn />
      )
      let tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('<LinkBtn />', () => {
    it('render without crashing', async () => {
      const component = renderer.create(
          <LinkBtn />
      )
      let tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})

describe('Layout FormFields', () => {
  describe('<CustomTextField />', () => {
    it('render without crashing', async () => {
      const component = renderer.create(
          <CustomTextField />
      )
      let tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('<CustomSwitch />', () => {
    it('render without crashing', async () => {
      const component = renderer.create(
          <CustomSwitch />
      )
      let tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})

describe('Layout Texts', () => {
  describe('<Title />', () => {
    it('render without crashing', async () => {
      const component = renderer.create(
          <Title />
      )
      let tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('<SubTitle />', () => {
    it('render without crashing', async () => {
      const component = renderer.create(
          <SubTitle />
      )
      let tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('<StepProgress />', () => {
    it('render without crashing', async () => {
      const component = renderer.create(
          <StepProgress />
      )
      let tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    it('render without crashing with props', async () => {
      const component = renderer.create(
          <StepProgress step={10} total={1000} />
      )
      let tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('<CustomText />', () => {
    it('render without crashing', async () => {
      const component = renderer.create(
          <CustomText />
      )
      let tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
  })

  describe('<ScreenTitle />', () => {
    it('render without crashing', async () => {
      const component = renderer.create(
          <ScreenTitle />
      )
      let tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})