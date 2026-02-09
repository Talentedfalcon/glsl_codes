#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float solid_rect(vec2 st,vec2 pos,float width,float height){
    pos-=vec2(width/2.,height/2.);
    float l=step(pos.x,st.x);
    float r=step(pos.x+width,st.x);
    float b=step(pos.y,st.y);
    float t=step(pos.y+height,st.y);
    return (l-r)*(b-t);
}

float time_shift=0.;
vec2 changing_tile(vec2 st,vec2 scale){
    st*=scale;
    float index=0.0;
    index+=floor(mod(st.y,scale.y));
    index+=floor(mod(st.x,scale.x));
    st=fract(st);
    time_shift=0.5*index;
    return st;
}

float block_choice(vec2 st,vec2 scale,float time_shift){
    scale.y+=2.;
    st*=scale;
    float index=0.0;
    index+=floor(mod(st.x,scale.x))*scale.x;
    index+=floor(mod(st.y,scale.y));
    st=fract(st);

    if(index!=0.0 && index!=scale.y-1.){
        float block=0.0;
        float height=0.7;
        float width=0.85;
        float gap=solid_rect(st,vec2(0.5,0.5),width/5.,height);
        block=solid_rect(st,vec2(0.5,0.5),width,height)-gap;
        float power=pow(2.,index+1.);
        float time_id=floor(mod((u_time+time_shift)*(scale.y-2.),power));
        for(float i=power/2.;i>=0.;i--){
            if(time_id==i+power/2.){
                block+=gap;
            }
        }
        return block;
    }
    return 0.0;
}

void main(){
    vec2 st=gl_FragCoord.xy/u_resolution;
    st.x*=u_resolution.x/u_resolution.y;
    vec3 color=vec3(1.0);

    st=changing_tile(st,vec2(10.));

    color-=vec3(block_choice(st,vec2(1.,5.),time_shift));

    gl_FragColor=vec4(color,1.);
}