import React, { useRef, useEffect } from 'react'
import { atom, useAtom } from 'jotai'
import { atomWithMachine } from 'jotai/xstate'
import { assign, createMachine } from 'xstate'
import { useGLTF, useAnimations } from '@react-three/drei'

// todo: use https://github.com/biowaffeln/zustand-middleware-xstate
const createMusicBoxMachine = () =>
  createMachine({
    id: 'musicbox',
    initial: 'closed',
    states: {
      closed: {
        on: {
          open: 'opening'
        }
      },
      opening: {
        on: {
          opened: 'opened'
        }
      },
      opened: {
        on: {
          close: 'closing'
        }
      },
      closing: {
        on: {
          closed: 'closed'
        }
      }
    }
  })

const musicBoxMachineAtom = atomWithMachine(() => createMusicBoxMachine())

export default function MusicBox(props) {
  const group = useRef()
  const { nodes, animations } = useGLTF('https://cdn.glitch.com/fd356a87-0fc8-473f-ab23-5bf9e9bd82d7%2Fmusic-box.glb')
  const { actions } = useAnimations(animations, group)
  const [state, send] = useAtom(musicBoxMachineAtom)

  useEffect(() => {
    //actions?.opening.play()
    //actions?.opened.play()
    //actions?.closing.play()
    // actions?.closed.play()
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={[0.3, 0.3, 0.3]}>
        <primitive object={nodes.Bone} />
        <primitive object={nodes.Bone001} />
        <skinnedMesh geometry={nodes['figurine-lo'].geometry} material={nodes['figurine-lo'].material} skeleton={nodes['figurine-lo'].skeleton} />
        <skinnedMesh geometry={nodes['lid-lo001'].geometry} material={nodes['lid-lo001'].material} skeleton={nodes['lid-lo001'].skeleton} />
      </group>
      <mesh castShadow receiveShadow geometry={nodes['box-lo'].geometry} material={nodes['box-lo'].material} />
    </group>
  )
}

useGLTF.preload('https://cdn.glitch.com/fd356a87-0fc8-473f-ab23-5bf9e9bd82d7%2Fmusic-box.glb')
